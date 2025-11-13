import React from "react";
import { Link } from "react-router-dom";
import "./ThankYou.css";

export default function ThankYou() {
  return (
    <div className="thank-you-container text-center">
      <h2>🎉 Thank You for Your Purchase!</h2>
      <p>Your order has been successfully confirmed. We will contact you soon.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Back to Home
      </Link>
    </div>
  );
}
