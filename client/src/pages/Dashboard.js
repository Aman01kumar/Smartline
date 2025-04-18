import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-2xl animate-pulse text-gray-600">🔄 Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  return user.role === 'admin' ? (
    <AdminDashboard user={user} />
  ) : (
    <UserDashboard user={user} />
  );
}

export default Dashboard;
