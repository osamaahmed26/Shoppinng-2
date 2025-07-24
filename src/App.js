import React, { useState } from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import CartProvider from './context/CartContext';
import Footer from './components/Footer';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import ProductDetails from './pages/ProductDetails';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <CartProvider>
      <Navbar setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}
