import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './ProductSection.css';

export default function ProductSection({ searchTerm = '' }) {
  const [products, setProducts] = useState([]);
  const { cartItems, favorites, toggleCart, toggleFavorite } = useContext(CartContext);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  // تصفية المنتجات حسب البحث
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">المنتجات</h2>
      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card product-card h-100">
                <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                  <img src={product.image} alt={product.title} className="card-img-top p-3" />
                </Link>
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">{product.title.slice(0, 40)}...</h6>
                  <p className="text-muted mb-1">${product.price}</p>
                  <div className="btn-actions">
                    <button
                      className={`btn btn-cart ${
                        cartItems.some(item => item.id === product.id)
                          ? 'btn-primary'
                          : 'btn-outline-primary'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCart(product);
                      }}
                    >
                      🛒
                    </button>
                    <button
                      className={`btn btn-fav ${
                        favorites.some(item => item.id === product.id)
                          ? 'btn-danger'
                          : 'btn-outline-danger'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(product);
                      }}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted">لا يوجد نتائج مطابقة</div>
        )}
      </div>
    </div>
  );
}
