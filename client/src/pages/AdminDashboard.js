// client/src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import socket from '../socket';

function AdminDashboard({ user }) {
  const [queue, setQueue] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.emit('adminJoin');

    const handleQueueUpdate = (data) => {
      console.log('📥 Queue updated:', data.queue);
      setQueue(data.queue);
    };

    const handleMessage = (msg) => {
      console.log('📢 Message:', msg);
      setMessage(msg);
      setTimeout(() => setMessage(''), 4000);
    };

    socket.on('queueUpdated', handleQueueUpdate);
    socket.on('message', handleMessage);

    return () => {
      socket.off('queueUpdated', handleQueueUpdate);
      socket.off('message', handleMessage);
    };
  }, []);

  const handleCallNext = () => {
    socket.emit('callNext');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🛠️ Admin Dashboard</h2>

      <button
        onClick={handleCallNext}
        style={{
          padding: '0.5rem 1.5rem',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        📞 Call Next
      </button>

      {message && (
        <div style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#d4edda', color: '#155724', borderRadius: '5px' }}>
          {message}
        </div>
      )}

      <h3 style={{ marginTop: '2rem' }}>📋 Current Queue</h3>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {queue.map((user, index) => (
          <li key={user.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #ccc' }}>
            <strong>{index + 1}.</strong> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
