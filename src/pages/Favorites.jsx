import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Favorites() {
  const { favorites } = useContext(CartContext);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">المفضلة</h2>
      <div className="row g-4">
        {favorites.length === 0 ? (
          <p className="text-center">لا توجد منتجات مضافة للمفضلة.</p>
        ) : (
          favorites.map(product => (
            <div className="col-md-3" key={product.id}>
              <div className="card product-card h-100">
                <img src={product.image} className="card-img-top p-3" alt={product.title} />
                <div className="card-body">
                  <h6>{product.title.slice(0, 40)}...</h6>
                  <p className="text-muted">${product.price}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
