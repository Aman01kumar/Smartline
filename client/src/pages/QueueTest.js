// client/src/pages/QueueTest.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './QueueTest.css'; // Include this CSS file

const QueueTest = () => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchQueue = async () => {
    setLoading(true);
    setError('');
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:10000';

    try {
      const res = await fetch(`${apiUrl}/queue`);
      const data = await res.json();

      if (res.ok) {
        setQueue(data);
      } else {
        setError(data.message || 'Failed to load queue');
      }
    } catch (err) {
      console.error('❌ Queue fetch error:', err);
      setError('Server error while fetching queue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="queue-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="queue-card"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="queue-title">📋 Queue Test Page</h2>

        <div className="queue-button-container">
          <button
            onClick={fetchQueue}
            disabled={loading}
            className={`queue-button ${loading ? 'disabled' : ''}`}
          >
            {loading ? 'Loading...' : 'Load Queue'}
          </button>
        </div>

        {error && <p className="queue-error">{error}</p>}

        <ul className="queue-list">
          {queue.length > 0 ? (
            queue.map((user, index) => (
              <motion.li
                key={index}
                className="queue-item"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                👤 {user.name || user.email || `User ${index + 1}`}
              </motion.li>
            ))
          ) : (
            !loading &&
            !error && (
              <p className="queue-empty">No one in the queue yet.</p>
            )
          )}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default QueueTest;
