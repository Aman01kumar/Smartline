import React, { useEffect, useState } from 'react';
import socket from '../socket';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

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
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-start py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-2xl"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-purple-700">👋 Welcome, {user.email}</h1>
        <p className="text-gray-600 mb-4">
          Your ID: <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{user._id}</span>
        </p>

        {!joined ? (
          <button
            onClick={handleJoinQueue}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition-all mb-4"
          >
            ➕ Join Queue
          </button>
        ) : (
          <p className="text-green-600 font-semibold mb-4">✅ You’ve joined the queue!</p>
        )}

        <hr className="my-6 border-gray-300" />

        <h2 className="text-xl font-semibold mb-3 text-gray-800">📋 Current Queue</h2>

        {queue.length === 0 ? (
          <p className="text-gray-500 italic">No users in queue yet.</p>
        ) : (
          <ul className="space-y-2">
            {queue.map((u, index) => (
              <li
                key={index}
                className={`px-4 py-2 rounded-lg shadow-sm ${
                  u.userId === user._id
                    ? 'bg-blue-100 font-semibold text-blue-800'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                👤 {u.email} {u.userId === user._id && <span className="text-sm">(You)</span>}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UserDashboard;
