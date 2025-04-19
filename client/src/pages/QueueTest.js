import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import './QueueTest.css';

const QueueTest = () => {
  const [queue, setQueue] = useState([]);
  const [message, setMessage] = useState('');
  const [calledUser, setCalledUser] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:10000';
  const socketPath = '/socket.io'; // as defined in backend

  useEffect(() => {
    const socket = io(apiUrl, {
      path: socketPath,
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('🟢 Connected to Socket.IO');
      socket.emit('adminJoin'); // ask for current queue on load
    });

    socket.on('queueUpdated', (data) => {
      setQueue(Array.isArray(data) ? data : data.queue || []);
    });

    socket.on('userCalled', (user) => {
      setCalledUser(user);
      setMessage(`📢 ${user.name || user.email} has been called!`);
    });

    socket.on('message', (msg) => {
      setMessage(msg);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Disconnected from Socket.IO');
    });

    return () => {
      socket.disconnect();
    };
  }, [apiUrl]);

  return (
    <motion.div className="queue-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div
        className="queue-card"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="queue-title">📡 Real-time Queue Monitor</h2>

        {message && <p className="queue-message">{message}</p>}

        {calledUser && (
          <div className="queue-highlight">
            🎉 {calledUser.name || calledUser.email} has been called!
          </div>
        )}

        <ul className="queue-list">
          {queue.length > 0 ? (
            queue.map((user, index) => (
              <motion.li
                key={user.id || index}
                className="queue-item"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                👤 {user.name || user.email || `User ${index + 1}`}
              </motion.li>
            ))
          ) : (
            <p className="queue-empty">No users in queue currently.</p>
          )}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default QueueTest;
