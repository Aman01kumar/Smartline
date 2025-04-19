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
    <div className="min-h-screen text-gray-800 bg-slate-100 flex flex-col justify-between">
      {/* Hero Section */}
      <motion.section
        className="bg-blue-600 text-white py-20 px-6 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
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
      </motion.section>

      {/* Feature Highlights */}
      <motion.section
        className="py-16 bg-slate-100 px-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Why Choose SmartLine?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: '⏱️ Real-time Queue Updates',
              desc: 'Get instant updates and never lose your place in line.',
            },
            {
              title: '📱 User-Friendly Interface',
              desc: 'Simple and intuitive UI designed for all users.',
            },
            {
              title: '🧠 Smart Management',
              desc: 'Efficiently manage queues with powerful admin tools.',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-white shadow-md rounded-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
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
        <h2 className="text-3xl font-bold mb-10 text-gray-800">What Our Users Say</h2>
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
          ].map((testimonial, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-50 p-6 rounded-lg shadow hover:shadow-md"
              whileHover={{ scale: 1.02 }}
            >
              <p className="italic">{testimonial.feedback}</p>
              <p className="mt-2 font-semibold text-blue-700">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Live Queue Preview */}
      <motion.section
        className="py-16 bg-slate-100 px-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">📋 Live Queue Preview</h2>
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
      <motion.footer
        className="bg-blue-600 text-white py-8 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          <div>
            <h3 className="text-2xl font-bold">SmartLine</h3>
            <p className="text-sm mt-1">Smart. Fast. Organized.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <p className="text-sm">support@smartlineapp.com</p>
            <p className="text-sm">+1 (555) 123-4567</p>
          </div>
          <div>
            <p className="text-sm">&copy; {new Date().getFullYear()} SmartLine. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default HomePage;
