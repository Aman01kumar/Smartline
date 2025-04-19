import React, { useEffect, useState } from 'react';
import socket from '../socket';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = ({ user }) => {
  const [queue, setQueue] = useState([]);
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const res = await fetch('https://smartline-backend.onrender.com/api/queue');
        const data = await res.json();
        setQueue(data);
        if (data.some(u => u.userId === user._id)) {
          setJoined(true);
        }
      } catch (error) {
        console.error('Error fetching queue:', error);
      }
    };

    fetchQueue();

    const handleQueueUpdate = ({ queue }) => {
      setQueue(queue);
    };

    const handleUserCalled = (calledUser) => {
      if (calledUser.userId === user._id) {
        toast.success("🎉 It's your turn! Please proceed.");
      }
    };

    socket.on('queueUpdated', handleQueueUpdate);
    socket.on('userCalled', handleUserCalled);

    socket.on('connect', () => {
      if (joined) {
        socket.emit('joinQueue', {
          userId: user._id,
          email: user.email,
        });
      }
    });

    return () => {
      socket.off('queueUpdated', handleQueueUpdate);
      socket.off('userCalled', handleUserCalled);
      socket.off('connect');
    };
  }, [user, joined]);

  const handleJoinQueue = () => {
    socket.emit('joinQueue', {
      userId: user._id,
      email: user.email,
    });
    setJoined(true);
    toast.info('🙌 You’ve joined the queue!');
  };

  const handleLogout = () => {
    socket.disconnect(); // Disconnect socket on logout
    localStorage.removeItem('user'); // Or however you're storing user data
    toast.info('👋 Logged out successfully');
    navigate('/logout'); // or navigate('/login') depending on your flow
  };

  return (
    <motion.div
      className="user-dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="user-dashboard-card"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="dashboard-header">
          <h1 className="user-dashboard-title">👋 Welcome, {user.email}</h1>
          <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>

        <p className="user-id">
          Your ID: <span className="user-id-tag">{user._id}</span>
        </p>

        {!joined ? (
          <button className="join-btn" onClick={handleJoinQueue}>
            ➕ Join Queue
          </button>
        ) : (
          <p className="joined-message">✅ You’ve joined the queue!</p>
        )}

        <hr className="divider" />

        <h2 className="queue-heading">📋 Current Queue</h2>

        {queue.length === 0 ? (
          <p className="no-queue">No users in queue yet.</p>
        ) : (
          <ul className="queue-list">
            {queue.map((u, index) => (
              <li
                key={index}
                className={`queue-item ${u.userId === user._id ? 'your-turn' : ''}`}
              >
                👤 {u.email} {u.userId === user._id && <span>(You)</span>}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UserDashboard;
