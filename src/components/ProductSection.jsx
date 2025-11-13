import React, { useContext } from "react";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./ProductSection.css";

export default function ProductSection({ products = [] }) {
  const { cartItems = [], favorites = [], toggleCart, toggleFavorite } =
    useContext(CartContext) || {};

  if (!products.length) {
    return (
      <div className="text-center my-5">
        <p className="text-muted fs-5">No products available to display 😔</p>
      </div>
    );
  }

  const isInCart = (id) => cartItems.some((item) => item.id === id);
  const isFavorite = (id) => favorites.some((item) => item.id === id);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold section-title">🛍️ Products</h2>

      <div className="row g-4">
        {products.map((product) => (
          <div className="col-md-4 col-lg-3" key={product.id}>
            <div className="product-card text-center">
              <div className="img-container">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-img"
                  />
                </Link>

                <div className="hover-actions">
                  <button
                    className={`hover-btn cart-btn ${
                      isInCart(product.id) ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleCart(product);
                    }}
                  >
                    <FaCartPlus className="me-2" />
                    {isInCart(product.id) ? "Added to Cart" : "Add to Cart"}
                  </button>

                  <button
                    className={`hover-btn fav-btn ${
                      isFavorite(product.id) ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product);
                    }}
                  >
                    <FaHeart />
                  </button>
                </div>
              </div>

              <div className="product-info mt-3">
                <Link
                  to={`/product/${product.id}`}
                  className="text-decoration-none"
                >
                  <h6 className="product-title text-truncate">
                    {product.title}
                  </h6>
                </Link>
                <p className="product-price">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
