import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer mt-auto py-4">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Shopping Land</h5>
            <p>The best place to shop online easily and securely.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h6>Contact Us</h6>
            <p>📧 info@shoppingland.com</p>
            <p>📞 +20 123 456 7890</p>
          </div>
        </div>
        <hr />
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Shopping Land. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
