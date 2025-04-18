// client/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
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
          alert(data.message || 'Failed to authenticate');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Server error.');
        navigate('/login');
      }
    };

    fetchUserInfo();
  }, [navigate]);

  if (!user) return <p style={{ textAlign: 'center' }}>🔄 Loading Dashboard...</p>;

  return user.role === 'admin' ? (
    <AdminDashboard user={user} />
  ) : (
    <UserDashboard user={user} />
  );
}

export default Dashboard;
