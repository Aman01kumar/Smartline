import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL, {
  transports: ['websocket'],  // 👈 Force WebSocket transport (required for Render)
  withCredentials: true,
  path: "/socket.io" // 👈 Must match backend socket path
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket connection error:", err.message);
});

export default socket;
