// client/src/socket.js
import { io } from 'socket.io-client';

// Remove '/api' if present in the env URL
const baseUrl = (process.env.REACT_APP_API_URL || 'http://localhost:10000').replace(/\/api$/, '');

const socket = io(baseUrl, {
  path: '/socket.io',
  transports: ['websocket'],
  withCredentials: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000,
  autoConnect: true,
});

socket.on('connect', () => {
  console.log('🟢 [Socket] Connected:', socket.id);
});

socket.on('connect_error', (err) => {
  console.error('❌ [Socket] Connection error:', err.message);
});

socket.on('disconnect', (reason) => {
  console.warn('⚠️ [Socket] Disconnected:', reason);
});

socket.on('reconnect_attempt', (attempt) => {
  console.info(`🔁 [Socket] Reconnection attempt #${attempt}`);
});

export default socket;
