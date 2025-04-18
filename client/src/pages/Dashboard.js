import React, { useEffect, useState } from 'react';
import socket from '../socket';

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [queueMessage, setQueueMessage] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data);
          socket.emit('joinQueue', { email: data.email, id: data._id }); // ✅ Join the queue
        } else {
          alert(data.message || 'Failed to fetch user info');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        alert('Server error');
      }
    };

    fetchUserInfo();

    // ✅ Handle live queue updates from server
    socket.on('queueUpdated', (info) => {
      setQueueMessage(`Queue updated: ${info.email} joined`);
    });

    return () => {
      socket.off('queueUpdated');
    };
  }, []);

  if (!user) return <p>Loading user data...</p>;

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      <p>Your ID: {user._id}</p>
      {queueMessage && <p>{queueMessage}</p>}
    </div>
  );
}

export default UserDashboard;
