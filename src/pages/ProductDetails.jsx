import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  const { cartItems, favorites, toggleCart, toggleFavorite } =
    useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!product) return;
    setLoadingRelated(true);
    fetch(`https://fakestoreapi.com/products/category/${product.category}`)
      .then((res) => res.json())
      .then((data) => {
        setRelatedProducts(data.filter((p) => p.id !== product.id));
        setLoadingRelated(false);
      })
      .catch(console.error);
  }, [product]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!product) return <div className="text-center mt-5">Product not found</div>;

  const isInCart = cartItems.some((item) => item.id === product.id);
  const isFavorite = favorites.some((item) => item.id === product.id);

  const handleCart = () => toggleCart(product);
  const handleFavorite = () => toggleFavorite(product);

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-5 text-center">
            <img src={product.image} alt={product.title} className="img-fluid" />
          </div>

          <div className="col-md-7">
            <h3>{product.title}</h3>
            <p className="text-muted">{product.category}</p>
            <h4 className="text-primary">${product.price}</h4>
            <p>{product.description}</p>

            <button
              className={`btn me-2 ${isInCart ? "btn-danger" : "btn-primary"}`}
              onClick={handleCart}
            >
              {isInCart ? "❌ Remove from Cart" : "🛒 Add to Cart"}
            </button>

            <button
              className={`btn ${isFavorite ? "btn-danger" : "btn-outline-danger"}`}
              onClick={handleFavorite}
            >
              {isFavorite ? "❤️ Added to Favorites" : "❤️ Add to Favorites"}
            </button>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h4>Related Products</h4>
        {loadingRelated ? (
          <p>Loading related products...</p>
        ) : relatedProducts.length === 0 ? (
          <p>No similar products found.</p>
        ) : (
          <div className="row">
            {relatedProducts.map((p) => (
              <div key={p.id} className="col-6 col-md-3 mb-4">
                <Link
                  to={`/product/${p.id}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="card h-100">
                    <img
                      src={p.image}
                      className="card-img-top"
                      alt={p.title}
                      style={{ maxHeight: "150px", objectFit: "contain" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{p.title}</h6>
                      <p className="text-primary">${p.price}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
