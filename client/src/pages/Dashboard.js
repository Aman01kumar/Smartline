import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import { motion } from 'framer-motion';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUserInfo = useCallback(async () => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:10000';

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
      } else {
        alert(data.message || '⚠️ Failed to authenticate');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      alert('❌ Server error. Please try again later.');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  if (!user) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-center text-white"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-3xl font-semibold animate-pulse">🔄 Loading Dashboard...</h2>
          <p className="mt-2 text-lg">Fetching your profile details...</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {user.role === 'admin' ? (
        <AdminDashboard user={user} />
      ) : (
        <UserDashboard user={user} />
      )}
    </motion.div>
  );
}

export default Dashboard;
