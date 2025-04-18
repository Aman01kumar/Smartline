import { io } from 'socket.io-client';

// ✅ Ensure API URL is defined
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:10000'; // fallback for local testing

const socket = io(apiUrl, {
  transports: ['websocket'],     // ✅ Use WebSocket (preferred by Render)
  withCredentials: true,         // ✅ Required if using credentials (cookies, etc.)
  path: '/socket.io',            // ✅ Must match server's Socket.IO path
});

socket.on('connect', () => {
  console.log('🟢 Socket connected:', socket.id);
});

socket.on('connect_error', (err) => {
  console.error('❌ Socket connection error:', err.message);
});

export default socket;
