import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const toggleCart = (product) => {
    const exists = cartItems.some(item => item.id === product.id);
    if (exists) {
      setCartItems(prev => prev.filter(item => item.id !== product.id));
    } else {
      setCartItems(prev => [...prev, product]);
    }
  };

  const toggleFavorite = (product) => {
    const exists = favorites.some(item => item.id === product.id);
    if (exists) {
      setFavorites(prev => prev.filter(item => item.id !== product.id));
    } else {
      setFavorites(prev => [...prev, product]);
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      favorites,
      toggleCart,
      toggleFavorite
    }}>
      {children}
    </CartContext.Provider>
  );
}
