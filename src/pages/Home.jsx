import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import image1 from "../assets/banner_tablet_new.png";
import CategorySection from "../components/CategorySection";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import "./Home.css";

export default function Home({ searchTerm }) {
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState([]);
  const { toggleCart, toggleFavorite, cartItems, favorites } = useContext(CartContext);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setDarkMode(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isInCart = (id) => cartItems?.some((item) => item.id === id);
  const isFavorite = (id) => favorites?.some((item) => item.id === id);

  return (
    <div className={`home-page ${darkMode ? "dark-mode" : ""}`}>
      <img
        src={image1}
        alt="Main Banner"
        className="img-fluid w-100 banner-image"
      />

      <CategorySection />

      <div className="container py-5">
        <h3 className="fw-bold mb-4 text-center">Products</h3>

        <div className="row g-4">
          {filteredProducts.length === 0 ? (
            <p className="text-center mt-3 text-muted">
              No products found 🔍
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="col-6 col-md-3">
                <div className="product-card">
                  <Link
                    to={`/product/${product.id}`}
                    className="product-link"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="product-img"
                    />
                  </Link>

                  <div className="product-hover">
                    <button
                      className={`product-btn ${isInCart(product.id) ? "active" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCart(product);
                      }}
                    >
                      <FaCartPlus />
                    </button>

                    <button
                      className={`product-btn favorite ${
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

                  <div className="product-info text-center">
                    <Link
                      to={`/product/${product.id}`}
                      className="product-title text-decoration-none"
                    >
                      {product.title}
                    </Link>
                    <p className="product-price">${product.price}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}