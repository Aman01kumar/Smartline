import React, { useEffect, useState } from 'react';
import socket from '../socket';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard({ user }) {
  const [queue, setQueue] = useState([]);
  const [message, setMessage] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('adminJoin');

    const handleQueueUpdate = (data) => {
      setQueue(data.queue);
    };

    const handleMessage = (msg) => {
      setMessage(msg);
      setTimeout(() => setMessage(''), 4000);
    };

    socket.on('queueUpdated', handleQueueUpdate);
    socket.on('message', handleMessage);

    fetchRegisteredUsers();

    return () => {
      socket.off('queueUpdated', handleQueueUpdate);
      socket.off('message', handleMessage);
    };
  }, []);

  const fetchRegisteredUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setRegisteredUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const handleCallNext = () => {
    socket.emit('callNext');
  };

  const handleRemoveUser = async (id) => {
    try {
      await fetch(`/api/users/${id}`, { method: 'DELETE' });
      fetchRegisteredUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleAddUser = async () => {
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newUserEmail }),
      });
      setNewUserEmail('');
      fetchRegisteredUsers();
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/logout"); // Redirect
  };

  return (
    <motion.div
      className="admin-dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="dashboard-box"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="dashboard-header">
          <h2 className="dashboard-title">🛠️ Admin Dashboard</h2>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>

        <button onClick={handleCallNext} className="call-button">
          📞 Call Next
        </button>

        <AnimatePresence>
          {message && (
            <motion.div
              className="message-box"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        <h3 className="section-title">📋 Current Queue</h3>
        {queue.length === 0 ? (
          <p className="empty-text">No users in the queue.</p>
        ) : (
          <ul className="user-list">
            {queue.map((user, index) => (
              <li key={user._id || index} className="user-item">
                <strong>{index + 1}.</strong> {user.email}
              </li>
            ))}
          </ul>
        )}

        <h3 className="section-title">👥 Registered Users</h3>
        <ul className="user-list">
          {registeredUsers.map((u) => (
            <li key={u._id} className="user-item">
              {u.email}
              <button onClick={() => handleRemoveUser(u._id)} className="remove-btn">❌</button>
            </li>
          ))}
        </ul>

        <div className="add-user-form">
          <input
            type="email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            placeholder="Enter new user email"
          />
          <button onClick={handleAddUser}>➕ Add User</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AdminDashboard;
