import React from 'react';
import { motion } from 'framer-motion';
import './ContactPage.css'; // custom CSS

function ContactPage() {
  return (
    <motion.div
      className="contact-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="contact-box">
        <h1 className="contact-title">📬 Contact Us</h1>

        <p className="contact-text">
          We’d love to hear from you! Reach out through the details below.
        </p>

        <div className="contact-details">
          <p>
            📧 Email:{" "}
            <a href="mailto:support@smartline.com" className="contact-link">
              support@smartline.com
            </a>
          </p>
          <p>
            📞 Phone:{" "}
            <a href="tel:+1234567890" className="contact-link">
              +123-456-7890
            </a>
          </p>
        </div>

        {/* Optional contact form for future */}
        {/*
        <form className="contact-form">
          <input
            type="text"
            placeholder="Your Name"
            className="contact-input"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="contact-input"
          />
          <textarea
            placeholder="Your Message"
            className="contact-input"
            rows={4}
          />
          <button type="submit" className="contact-button">
            Send Message
          </button>
        </form>
        */}
      </div>
    </motion.div>
  );
}

export default ContactPage;
