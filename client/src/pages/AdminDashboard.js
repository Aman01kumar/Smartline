import React, { useEffect, useState } from 'react';
import socket from '../socket';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:10000';

    const fetchUsers = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (res.ok) {
          setUsers(data);
        } else {
          console.error('Failed to fetch users:', data.message);
          alert('Unauthorized or failed to fetch users.');
        }
      } catch (err) {
        console.error('Server error:', err);
        alert('Server error while fetching users.');
      }
    };

    fetchUsers();

    // 🧩 Socket Listeners
    socket.on('queueUpdated', (newEntry) => {
      console.log('📥 Queue updated:', newEntry);
      setQueue((prev) => [...prev, newEntry]);
    });

    socket.on('userCalled', (user) => {
      console.log('📤 Calling next user:', user);
      alert(`📞 Calling: ${user.email || 'Unknown User'}`);
    });

    return () => {
      socket.off('queueUpdated');
      socket.off('userCalled');
    };
  }, []);

  const callNextUser = () => {
    if (queue.length === 0) {
      alert('⚠️ Queue is empty.');
      return;
    }

    const [nextUser, ...restQueue] = queue;
    socket.emit('callNextUser', nextUser);
    setQueue(restQueue);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>👨‍💼 Admin Dashboard</h2>

      <button
        onClick={callNextUser}
        disabled={queue.length === 0}
        style={{
          padding: '0.5rem 1rem',
          marginBottom: '1rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: queue.length > 0 ? 'pointer' : 'not-allowed'
        }}
      >
        📞 Call Next
      </button>

      <h3>🧑‍💻 Queue List:</h3>
      {queue.length === 0 ? (
        <p>No users in queue.</p>
      ) : (
        <ul>
          {queue.map((item, i) => (
            <li key={i}>{item.email || 'Unknown User'}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminDashboard;
