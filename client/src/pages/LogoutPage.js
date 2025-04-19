// client/src/pages/LogoutPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LogoutPage.css'; // Plain CSS styling

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token and user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Optional: You could also clear all of localStorage with localStorage.clear()

    // Redirect to login after delay
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <motion.div
      className="logout-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="logout-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="logout-title">👋 Logged Out</h2>
        <p className="logout-text">Redirecting to login page...</p>
      </motion.div>
    </motion.div>
  );
}

export default LogoutPage;
