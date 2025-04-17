const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('../db'); // Adjust the path if needed

dotenv.config();
connectDB(); // ✅ MongoDB connected

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tokens', require('./routes/tokenRoutes'));

// WebSocket logic
io.on('connection', (socket) => {
  console.log('⚡ New client connected');

  socket.on('disconnect', () => {
    console.log('🚪 Client disconnected');
  });
});

app.set('socketio', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
