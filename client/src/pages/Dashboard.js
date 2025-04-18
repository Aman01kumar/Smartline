import React, { useEffect, useState } from 'react';
import socket from '../socket';

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [queueMessage, setQueueMessage] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:10000';

      if (!token) {
        alert('Please log in first.');
        window.location.href = '/login';
        return;
      }

      try {
        const res = await fetch(`${apiUrl}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data);
          socket.emit('joinQueue', { email: data.email, id: data._id });
          console.log('🟢 Joined queue as:', data.email);
        } else {
          console.warn('⚠️ Failed to fetch user info:', data.message);
          alert(data.message || 'Failed to fetch user info.');
        }
      } catch (err) {
        console.error('❌ Error fetching user info:', err);
        alert('Server error. Please try again later.');
      }
    };

    fetchUserInfo();

    const handleQueueUpdate = (info) => {
      console.log('📥 Queue update received:', info);
      setQueueMessage(`📢 ${info.email} joined the queue`);
    };

    socket.on('queueUpdated', handleQueueUpdate);

    return () => {
      socket.off('queueUpdated', handleQueueUpdate);
    };
  }, []);

  if (!user) return <p style={{ textAlign: 'center' }}>🔄 Loading your dashboard...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🙋 Welcome, {user.email}</h2>
      <p><strong>Your ID:</strong> {user._id}</p>
      {queueMessage && <p style={{ color: 'green' }}>{queueMessage}</p>}
    </div>
  );
}

export default UserDashboard;
