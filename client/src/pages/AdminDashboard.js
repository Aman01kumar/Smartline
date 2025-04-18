import React, { useEffect, useState } from 'react';
import socket from '../socket';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setUsers(data);
        else alert('Unauthorized or failed to fetch users');
      } catch (err) {
        console.error(err);
        alert('Server error');
      }
    };

    fetchUsers();

    // Listen for live updates
    socket.on('queueUpdated', (data) => {
      console.log('Queue updated:', data);
      setQueue((prev) => [...prev, data]);
    });

    socket.on('userCalled', (data) => {
      console.log('User called:', data);
      alert(`Calling next user: ${data}`);
    });

    return () => {
      socket.off('queueUpdated');
      socket.off('userCalled');
    };
  }, []);

  const callNextUser = () => {
    const next = queue.shift();
    if (next) {
      socket.emit('callNextUser', next);
      setQueue(queue);
    } else {
      alert('Queue is empty');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={callNextUser}>Call Next</button>
      <h3>Current Queue:</h3>
      <ul>
        {queue.map((item, i) => (
          <li key={i}>{item.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
