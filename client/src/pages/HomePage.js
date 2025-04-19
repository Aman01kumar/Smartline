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
      .catch(() => {
        setError('Failed to load queue data.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen text-gray-800 bg-white">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-4">Welcome to SmartLine</h1>
          <p className="text-lg mb-6 max-w-xl mx-auto">
            A smart and efficient queue management system to save time and streamline your experience.
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
        </motion.div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 bg-gray-100 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose SmartLine?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: '⏱️',
              title: 'Real-time Queue Updates',
              desc: 'Get instant updates and never lose your place in line.',
            },
            {
              icon: '📱',
              title: 'User-Friendly Interface',
              desc: 'Simple and intuitive UI designed for all users.',
            },
            {
              icon: '🧠',
              title: 'Smart Management',
              desc: 'Efficiently manage queues with powerful admin tools.',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-white shadow rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            { text: "SmartLine saved us hours of waiting time. It's brilliant!", name: 'Ayesha, Student' },
            { text: "Super smooth experience. Managing queues was never this easy.", name: 'Ahmed, Admin' },
          ].map((testi, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-50 p-6 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <p>"{testi.text}"</p>
              <p className="mt-2 font-semibold">– {testi.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Live Queue Preview */}
      <section className="py-16 bg-gray-100 px-6 text-center">
        <h2 className="text-2xl font-bold mb-6">📋 Live Queue Preview</h2>
        {loading && <p className="text-gray-500 animate-pulse">Loading queue...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && queueData.length > 0 && (
          <ul className="list-disc list-inside max-w-md mx-auto text-left bg-white p-4 rounded-lg shadow">
            {queueData.map((user, index) => (
              <li key={user._id || index}>{user.name || user.email || 'Anonymous User'}</li>
            ))}
          </ul>
        )}
        {!loading && !error && queueData.length === 0 && (
          <p className="text-gray-600 mt-4">The queue is currently empty.</p>
        )}
      </section>
    </div>
  );
}

export default HomePage;
