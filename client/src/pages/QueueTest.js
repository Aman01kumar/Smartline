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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">📋 Queue Test Page</h2>
      <button
        onClick={fetchQueue}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Load Queue
      </button>

      {loading && <p className="mt-4 text-gray-600">Loading queue...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <ul className="mt-4">
        {queue.map((user, index) => (
          <li key={index} className="border p-2 mb-2 rounded bg-gray-100">
            {user.name || user.email || `User ${index + 1}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueueTest;
