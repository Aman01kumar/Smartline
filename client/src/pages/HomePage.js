import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [queueData, setQueueData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:10000';

    fetch(`${apiUrl}/queue`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setQueueData(data);
        console.log('✅ Queue data:', data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ API fetch error:', err);
        setError('Failed to load queue data.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">🚀 Welcome to SmartLine</h1>

      <div className="mb-6 space-x-4">
        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
      </div>

      {loading && <p className="text-gray-500 animate-pulse">Loading queue...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && queueData.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">📋 Current Queue:</h3>
          <ul className="list-disc list-inside text-left">
            {queueData.map((user, index) => (
              <li key={user._id || index}>
                {user.name || user.email || 'Anonymous User'}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && !error && queueData.length === 0 && (
        <p className="text-gray-600 mt-4">The queue is currently empty.</p>
      )}
    </div>
  );
}

export default HomePage;
