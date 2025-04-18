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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">🛠️ Admin Dashboard</h2>

        <button
          onClick={handleCallNext}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
        >
          📞 Call Next
        </button>

        {message && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md font-medium">
            {message}
          </div>
        )}

        <h3 className="text-xl font-semibold mt-8 mb-3">📋 Current Queue</h3>
        {queue.length === 0 ? (
          <p className="text-gray-500 italic">No users in the queue.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {queue.map((user, index) => (
              <li key={user.id} className="py-2">
                <strong>{index + 1}.</strong> {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
