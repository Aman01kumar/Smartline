import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">📋 Queue Test Page</h2>

        <div className="flex justify-center">
          <button
            onClick={fetchQueue}
            disabled={loading}
            className={`px-6 py-2 rounded-full font-semibold text-white transition duration-300 ${
              loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Loading...' : 'Load Queue'}
          </button>
        </div>

        {error && <p className="mt-4 text-center text-red-600">{error}</p>}

        <ul className="mt-6 space-y-3">
          {queue.length > 0 ? (
            queue.map((user, index) => (
              <motion.li
                key={index}
                className="bg-gray-100 p-4 rounded-xl shadow flex items-center text-gray-700"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                👤 {user.name || user.email || `User ${index + 1}`}
              </motion.li>
            ))
          ) : (
            !loading &&
            !error && (
              <p className="text-center text-gray-500 mt-4">No one in the queue yet.</p>
            )
          )}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default QueueTest;
