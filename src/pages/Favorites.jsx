import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";

export default function Favorites() {
  const { favorites, toggleFavorite, clearFavorites } = useContext(CartContext);

  if (favorites.length === 0)
    return <div className="text-center mt-5">No favorite products yet ❤️</div>;

  return (
    <div className="container py-5">
      <h3 className="mb-4 text-center">Favorites</h3>
      <div className="row">
        {favorites.map((item) => (
          <div key={item.id} className="col-6 col-md-3 mb-4">
            <div className="card h-100 text-center shadow-sm">
              <img
                src={item.image}
                alt={item.title}
                className="card-img-top"
                style={{ maxHeight: "150px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h6 className="card-title">{item.title}</h6>
                <p className="text-primary">${item.price}</p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => toggleFavorite(item)}
                >
                  <FaTrashAlt className="me-1" /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-center">
        <button className="btn btn-warning" onClick={clearFavorites}>
          Clear All Favorites
        </button>
      </div>
    </div>
  );
}
