import { io } from 'socket.io-client';

// ✅ Use env variable or fallback to localhost for dev
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:10000';

// ✅ Create and export Socket.IO client instance
const socket = io(apiUrl, {
  transports: ['websocket'],
  withCredentials: true,
  path: '/socket.io', // ✅ Must match server config on Render
  reconnectionAttempts: 5, // Optional: Retry on disconnect
  timeout: 10000, // Optional: Connection timeout
});

socket.on('connect', () => {
  console.log('🟢 Socket connected:', socket.id);
});

socket.on('connect_error', (err) => {
  console.error('❌ Socket connection error:', err.message);
});

export default socket;
