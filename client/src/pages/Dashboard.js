import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

function Dashboard() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tokens')
      .then(res => res.json())
      .then(data => setTokens(data));

    socket.on('new_token', token => {
      setTokens(prev => [...prev, token]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h2>Live Queue</h2>
      <ul>
        {tokens.map((token, idx) => (
          <li key={idx}>{token.priority} - {token.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
