import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="container my-5">
      <h2 className="mb-4">🛒 سلة المشتريات</h2>
      {cartItems.length === 0 ? (
        <p>السلة فارغة</p>
      ) : (
        <div className="row">
          {cartItems.map((item, index) => (
            <div className="col-md-3 mb-3" key={index}>
              <div className="card h-100">
                <img src={item.image} className="card-img-top" alt={item.name} />
                <div className="card-body text-center">
                  <h5>{item.name}</h5>
                  <p>{item.price}</p>
                  <button className="btn btn-danger" onClick={() => removeFromCart(index)}>
                    حذف من السلة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
