import { io } from 'socket.io-client';

const baseUrl = (process.env.REACT_APP_API_URL || 'http://localhost:10000').replace(/\/api$/, '');

const socket = io(baseUrl, {
  path: '/socket.io',
  transports: ['websocket'],
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 10,
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

export default socket;
