import React, { useEffect, useState } from 'react';
import socket from '../socket';
import { motion, AnimatePresence } from 'framer-motion';

function AdminDashboard({ user }) {
  const [queue, setQueue] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.emit('adminJoin');

    const handleQueueUpdate = (data) => {
      console.log('📥 Queue updated:', data.queue);
      setQueue(data.queue);
    };

    const handleMessage = (msg) => {
      console.log('📢 Message:', msg);
      setMessage(msg);
      setTimeout(() => setMessage(''), 4000);
    };

    socket.on('queueUpdated', handleQueueUpdate);
    socket.on('message', handleMessage);

    return () => {
      socket.off('queueUpdated', handleQueueUpdate);
      socket.off('message', handleMessage);
    };
  }, []);

  const handleCallNext = () => {
    socket.emit('callNext');
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 flex items-center justify-center py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-2xl"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-pink-700 mb-4">🛠️ Admin Dashboard</h2>

        <button
          onClick={handleCallNext}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition mb-4"
        >
          📞 Call Next
        </button>

        <AnimatePresence>
          {message && (
            <motion.div
              className="mt-2 mb-6 p-4 rounded-md bg-green-100 text-green-800 font-semibold shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        <h3 className="text-xl font-semibold mb-3 text-gray-800">📋 Current Queue</h3>
        {queue.length === 0 ? (
          <p className="text-gray-500 italic">No users in the queue.</p>
        ) : (
          <ul className="divide-y divide-gray-300 rounded overflow-hidden bg-gray-50 shadow-inner">
            {queue.map((user, index) => (
              <li
                key={user.id || user._id || index}
                className="px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
              >
                <strong className="mr-2">{index + 1}.</strong> {user.email}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
}

export default AdminDashboard;
