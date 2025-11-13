import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cartItems")) || [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      return [];
    }
  });

  // 💾 Save to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // 🛒 Toggle Cart (prevent duplicates)
  const toggleCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) {
        toast.warn(`🛒 Removed ${item.title} from the cart`);
        return prev.filter((p) => p.id !== item.id);
      } else {
        toast.success(`🛍️ Added ${item.title} to the cart`);
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  // ❌ Remove single item
  const removeFromCart = (id) => {
    const item = cartItems.find((p) => p.id === id);
    setCartItems((prev) => prev.filter((p) => p.id !== id));
    if (item) toast.info(`🗑️ Deleted ${item.title} from the cart`);
  };

  // 💡 Update item quantity
  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // 💖 Toggle Favorite
  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) {
        toast.warn(`💔 Removed ${item.title} from favorites`);
        return prev.filter((p) => p.id !== item.id);
      } else {
        toast.success(`❤️ Added ${item.title} to favorites`);
        return [...prev, item];
      }
    });
  };

  // 🧹 Clear all
  const clearCart = () => {
    setCartItems([]);
    toast.info("🧹 All items removed from the cart");
  };

  const clearFavorites = () => {
    setFavorites([]);
    toast.info("💔 All items removed from favorites");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        favorites,
        toggleCart,
        toggleFavorite,
        removeFromCart,
        updateQuantity,
        clearCart,
        clearFavorites,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
