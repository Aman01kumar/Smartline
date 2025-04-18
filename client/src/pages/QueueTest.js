import React, { useState } from 'react';

const QueueTest = () => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchQueue = async () => {
    setLoading(true);
    setError('');
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:10000';

    try {
      const res = await fetch(`${apiUrl}/queue`);
      const data = await res.json();

      if (res.ok) {
        setQueue(data);
      } else {
        setError(data.message || 'Failed to load queue');
      }
    } catch (err) {
      console.error('❌ Queue fetch error:', err);
      setError('Server error while fetching queue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📋 Queue Test Page</h2>

      <button
        onClick={fetchQueue}
        disabled={loading}
        className={`px-4 py-2 rounded text-white transition ${
          loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'Loading...' : 'Load Queue'}
      </button>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      <ul className="mt-6 space-y-2">
        {queue.length > 0 ? (
          queue.map((user, index) => (
            <li
              key={index}
              className="border p-3 rounded bg-gray-100 shadow-sm flex items-center"
            >
              👤 {user.name || user.email || `User ${index + 1}`}
            </li>
          ))
        ) : (
          !loading &&
          !error && <p className="text-gray-500 mt-4">No one in the queue yet.</p>
        )}
      </ul>
    </div>
  );
};

export default QueueTest;
