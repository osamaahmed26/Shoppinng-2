import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer mt-auto py-4">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Shopping Land</h5>
            <p>أفضل مكان للتسوق عبر الإنترنت بكل سهولة وأمان.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6>روابط سريعة</h6>
            <ul className="list-unstyled">
              <li><Link to="/">الرئيسية</Link></li>
              <li><Link to="/signup">التسجيل</Link></li>
              <li><Link to="/cart">السلة</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h6>تواصل معنا</h6>
            <p>📧 info@shoppingland.com</p>
            <p>📞 +20 123 456 7890</p>
          </div>
        </div>
        <hr />
        <p className="mb-0">&copy; {new Date().getFullYear()} Shopping Land. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}
