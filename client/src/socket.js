// src/socket.js
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL); // Change to your Render backend when deploying

export default socket;
