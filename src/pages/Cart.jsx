import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate import
import "./Cart.css";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate(); // ✅ define navigate variable

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  if (cartItems.length === 0)
    return <div className="text-center mt-5">🛒 Your cart is empty</div>;

  // ✅ When clicking "Confirm Purchase"
  const handleCheckout = () => {
    clearCart(); // clear the cart
    navigate("/thank-you"); // redirect to thank you page
  };

  return (
    <div className="cart-container container py-5">
      <h3 className="cart-title text-center mb-4">Shopping Cart</h3>

      <table className="table cart-table text-center align-middle">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-img"
                />
              </td>
              <td className="cart-title-cell">{item.title}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <div className="quantity-control">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <FaMinus />
                  </button>
                  <span className="qty">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-footer mt-4">
        <div className="cart-total">
          <strong>Total Amount: </strong> ${total}
        </div>
        <div className="cart-actions">
          <button className="btn btn-warning" onClick={clearCart}>
            Clear All Products
          </button>
          <button className="btn btn-success ms-2" onClick={handleCheckout}>
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
}