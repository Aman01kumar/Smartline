// client/src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HomePage.css';

function HomePage() {
  const [queueData, setQueueData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:10000';
    fetch(`${apiUrl}/queue`)
      .then((res) => res.ok ? res.json() : Promise.reject(res))
      .then((data) => {
        setQueueData(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load queue data.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="homepage">
      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>Welcome to SmartLine</h1>
        <p>Manage queues smarter with real-time updates and seamless control.</p>
        <div className="hero-buttons">
          <Link to="/login" className="btn primary">Login</Link>
          <Link to="/register" className="btn secondary">Register</Link>
        </div>
      </motion.section>

      <section className="features">
        <h2>Why Choose SmartLine?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <span>⏱️</span>
            <h3>Real-Time Updates</h3>
            <p>See your position in the queue live.</p>
          </div>
          <div className="feature-card">
            <span>📱</span>
            <h3>User Friendly</h3>
            <p>Simple interface for all users.</p>
          </div>
          <div className="feature-card">
            <span>🧠</span>
            <h3>Admin Control</h3>
            <p>Manage queues effortlessly.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <p>"SmartLine saved me hours of waiting!"</p>
            <span>- Ayesha, Student</span>
          </div>
          <div className="testimonial">
            <p>"Smooth experience and great control."</p>
            <span>- Ahmed, Admin</span>
          </div>
        </div>
      </section>

      <section className="queue-preview">
        <h2>Live Queue Preview</h2>
        {loading && <p className="status">Loading...</p>}
        {error && <p className="status error">{error}</p>}
        {!loading && !error && queueData.length === 0 && (
          <p className="status">The queue is empty.</p>
        )}
        {!loading && queueData.length > 0 && (
          <ul className="queue-list">
            {queueData.map((user, index) => (
              <li key={user._id || index}>
                {user.name || user.email || 'User'}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default HomePage;
