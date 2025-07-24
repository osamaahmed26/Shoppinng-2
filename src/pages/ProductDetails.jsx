import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  const { cartItems, favorites, toggleCart, toggleFavorite } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!product) return;
    setLoadingRelated(true);
    fetch(`https://fakestoreapi.com/products/category/${product.category}`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(p => p.id !== product.id);
        setRelatedProducts(filtered);
        setLoadingRelated(false);
      })
      .catch(console.error);
  }, [product]);

  if (loading) return <div className="text-center mt-5">جاري التحميل...</div>;
  if (!product) return <div className="text-center mt-5">لم يتم العثور على المنتج</div>;

  const isInCart = cartItems.some(item => item.id === product.id);
  const isFavorite = favorites.some(item => item.id === product.id);

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-5">
            <img src={product.image} alt={product.title} className="img-fluid" />
          </div>
          <div className="col-md-7">
            <h3>{product.title}</h3>
            <p className="text-muted">{product.category}</p>
            <h4 className="text-primary">${product.price}</h4>
            <p>{product.description}</p>

            <button
              className={`btn me-2 ${isInCart ? 'btn-danger' : 'btn-primary'}`}
              onClick={() => toggleCart(product)}
            >
              {isInCart ? '❌ إزالة من السلة' : '🛒 أضف إلى السلة'}
            </button>

            <button
              className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => toggleFavorite(product)}
            >
              {isFavorite ? '❤️ تمت الإضافة' : '❤️ مفضلة'}
            </button>
          </div>
        </div>
      </div>

      {/* قسم المنتجات الأخرى */}
      <div className="container py-5">
        <h4>منتجات أخرى قد تعجبك</h4>
        {loadingRelated ? (
          <p>جاري تحميل المنتجات...</p>
        ) : relatedProducts.length === 0 ? (
          <p>لا توجد منتجات مشابهة.</p>
        ) : (
          <div className="row">
            {relatedProducts.map(p => (
              <div key={p.id} className="col-6 col-md-3 mb-4">
                <Link to={`/product/${p.id}`} className="text-decoration-none text-dark">
                  <div className="card h-100">
                    <img
                      src={p.image}
                      className="card-img-top"
                      alt={p.title}
                      style={{ maxHeight: '150px', objectFit: 'contain' }}
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
