// client/src/components/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3>SmartLine</h3>
          <p>Smart queue management for modern users.</p>
        </div>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>

        <div className="footer-right">
          <p>&copy; {new Date().getFullYear()} SmartLine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
