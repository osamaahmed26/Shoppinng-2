import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // لا تستخدم Router هنا
import Navbar from "./components/navbar";
import Footer from "./components/Footer"; // F كبير
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import ProductDetails from "./pages/ProductDetails";
import { ToastContainer, Slide } from "react-toastify";
import ThankYou from "./pages/ThankYou";
import "./App.css";
import "./index.css";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
        transition={Slide}
        toastStyle={{
          borderRadius: "10px",
          padding: "10px 16px",
          fontSize: "1rem",
          fontWeight: "500",
          direction: "rtl",
        }}
        bodyStyle={{
          color: localStorage.getItem("theme") === "dark" ? "#f1f1f1" : "#222",
        }}
      />
    </>
  );
}
