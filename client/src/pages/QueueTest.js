// client/src/pages/QueueTest.js

import React, { useState } from 'react';

const QueueTest = () => {
  const [queue, setQueue] = useState([]);

  const fetchQueue = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/queue`);
    const data = await res.json();
    setQueue(data);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Queue Test Page</h2>
      <button onClick={fetchQueue} className="px-4 py-2 bg-blue-500 text-white rounded">
        Load Queue
      </button>

      <ul className="mt-4">
        {queue.map((user, index) => (
          <li key={index} className="border p-2 mb-2 rounded bg-gray-100">
            {user.name || `User ${index + 1}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueueTest;
