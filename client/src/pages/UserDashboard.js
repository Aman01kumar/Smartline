import React, { useEffect, useState } from 'react';
import socket from '../socket';
import { toast } from 'react-toastify';

const UserDashboard = ({ user }) => {
  const [queue, setQueue] = useState([]);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const handleQueueUpdate = ({ queue }) => {
      setQueue(queue);
    };

    const handleUserCalled = (calledUser) => {
      if (calledUser.userId === user._id) {
        toast.success("🎉 It's your turn! Please proceed.");
      }
    };

    socket.on('queueUpdated', handleQueueUpdate);
    socket.on('userCalled', handleUserCalled);

    socket.on('connect', () => {
      if (joined) {
        socket.emit('joinQueue', {
          userId: user._id,
          email: user.email,
        });
      }
    });

    return () => {
      socket.off('queueUpdated', handleQueueUpdate);
      socket.off('userCalled', handleUserCalled);
      socket.off('connect');
    };
  }, [user, joined]);

  const handleJoinQueue = () => {
    socket.emit('joinQueue', {
      userId: user._id,
      email: user.email,
    });
    setJoined(true);
    toast.info('🙌 You’ve joined the queue!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-2">👋 Welcome, {user.email}</h1>
        <p className="text-gray-600 mb-4">
          Your ID: <span className="font-mono text-sm">{user._id}</span>
        </p>

        {!joined ? (
          <button
            onClick={handleJoinQueue}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
          >
            ➕ Join Queue
          </button>
        ) : (
          <p className="text-green-600 font-semibold">✅ You’ve joined the queue!</p>
        )}

        <hr className="my-6" />

        <h2 className="text-xl font-semibold mb-2">📋 Current Queue:</h2>
        {queue.length === 0 ? (
          <p className="text-gray-500 italic">No users in queue yet.</p>
        ) : (
          <ul className="list-disc list-inside text-gray-800">
            {queue.map((u, index) => (
              <li key={index} className="py-1">
                {u.email} {u.userId === user._id && <span className="text-blue-500">(You)</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
