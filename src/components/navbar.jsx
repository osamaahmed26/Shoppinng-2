import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Navbar({ setSearchTerm }) {
  const context = useContext(CartContext);

  // ✅ Safe access if context is not yet loaded
  const cartItems = context?.cartItems || [];
  const favorites = context?.favorites || [];

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <nav
      className={`navbar fixed-top navbar-expand-lg shadow-sm ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Shopping <span className="text-primary">Land</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            </li>
          </ul>

          <div className="d-flex me-3">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search for a product..."
              aria-label="Search"
              value={searchInput}
              onChange={(e) => {
                const value = e.target.value;
                setSearchInput(value);
                setSearchTerm(value);
              }}
            />
          </div>

          <Link to="/cart" className="btn btn-outline-primary me-2">
             Cart ({cartItems.length})
          </Link>

          <Link to="/favorites" className="btn btn-outline-danger me-2">
             Favorites ({favorites.length})
          </Link>

          <button onClick={toggleDarkMode} className="btn btn-outline-secondary">
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}
