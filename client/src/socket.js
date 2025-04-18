import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL, {
  transports: ['websocket'], // Force websocket (Render prefers this)
  withCredentials: true,
});

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err);
});

export default socket;
