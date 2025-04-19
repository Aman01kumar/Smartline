// client/src/pages/ContactPage.js
import React from 'react';
import { motion } from 'framer-motion';

function ContactPage() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold text-purple-700 mb-6">📬 Contact Us</h1>

        <p className="text-lg text-gray-700 mb-4">
          We’d love to hear from you! Reach out through the details below.
        </p>

        <div className="space-y-4 text-gray-800 text-lg">
          <p>
            📧 Email:{" "}
            <a
              href="mailto:support@smartline.com"
              className="text-blue-600 hover:underline"
            >
              support@smartline.com
            </a>
          </p>
          <p>
            📞 Phone:{" "}
            <a
              href="tel:+1234567890"
              className="text-blue-600 hover:underline"
            >
              +123-456-7890
            </a>
          </p>
        </div>

        {/* Optional contact form for future */}
        {/* 
        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows={4}
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition"
          >
            Send Message
          </button>
        </form>
        */}
      </div>
    </motion.div>
  );
}

export default ContactPage;
