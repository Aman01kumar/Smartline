import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function HomePage() {
  const [queueData, setQueueData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:10000';
    fetch(`${apiUrl}/queue`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setQueueData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load queue data.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white text-gray-800 font-sans">
      {/* Hero Section */}
      <motion.section
        className="bg-blue-600 text-white py-20 px-6 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-4">Welcome to SmartLine</h1>
        <p className="text-lg mb-6 max-w-xl mx-auto">
          A smarter way to manage your time in queues. Real-time updates and seamless experience.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border border-white px-6 py-2 rounded font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Register
          </Link>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        className="py-16 px-6 text-center bg-slate-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-10">Why Choose SmartLine?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: '⏱️',
              title: 'Real-time Updates',
              desc: 'Track your position in the queue as it moves.',
            },
            {
              icon: '📱',
              title: 'User Friendly UI',
              desc: 'Intuitive interface for all age groups.',
            },
            {
              icon: '🧠',
              title: 'Admin Control',
              desc: 'Manage queues and users with ease.',
            },
          ].map((f, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-white shadow-md rounded-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="py-16 px-6 bg-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            {
              feedback: '"SmartLine saved us hours of waiting time. It\'s brilliant!"',
              name: '- Ayesha, Student',
            },
            {
              feedback: '"Super smooth experience. Managing queues was never this easy."',
              name: '- Ahmed, Admin',
            },
          ].map((t, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-50 p-6 rounded-lg shadow hover:shadow-md"
              whileHover={{ scale: 1.02 }}
            >
              <p className="italic text-gray-700">{t.feedback}</p>
              <p className="mt-2 font-semibold text-blue-700">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Live Queue Preview */}
      <motion.section
        className="py-16 px-6 text-center bg-slate-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold mb-6">📋 Live Queue Preview</h2>
        {loading && <p className="text-gray-500 animate-pulse">Loading queue...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && queueData.length > 0 && (
          <ul className="list-disc list-inside max-w-md mx-auto text-left">
            {queueData.map((user, index) => (
              <li key={user._id || index}>
                {user.name || user.email || 'Anonymous User'}
              </li>
            ))}
          </ul>
        )}
        {!loading && !error && queueData.length === 0 && (
          <p className="text-gray-600 mt-4">The queue is currently empty.</p>
        )}
      </motion.section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-6 mt-10">
        <div className="max-w-6xl mx-auto px-6 text-center md:text-left md:flex md:justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">SmartLine</h3>
            <p className="text-sm">Smart. Simple. Streamlined.</p>
          </div>
          <div className="text-sm">
            <p>Contact: support@smartline.com</p>
            <p>© {new Date().getFullYear()} SmartLine Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
