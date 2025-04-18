import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [queueData, setQueueData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:10000';

    fetch(`${apiUrl}/api/queue`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setQueueData(data);
        console.log('✅ Queue data:', data);
      })
      .catch((err) => {
        console.error('❌ API fetch error:', err);
        setError('Failed to load queue data.');
      });
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🚀 Welcome to SmartLine</h1>

      <div style={{ margin: '1rem' }}>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {queueData.length > 0 && (
        <div>
          <h3>📋 Current Queue:</h3>
          <ul>
            {queueData.map((user, index) => (
              <li key={index}>{user.name || user.email || 'User'}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default HomePage;
