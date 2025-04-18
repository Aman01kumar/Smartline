// server/server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// ✅ CORS setup (Use frontend domain in production)
const corsOptions = {
  origin: 'https://smartline-frontend.netlify.app',
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Initialize Socket.IO
const io = new Server(server, {
  cors: corsOptions
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
const userRoutes = require('./routes/userRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

app.use('/api/users', userRoutes);
app.use('/api/tokens', tokenRoutes);

// ✅ Socket.IO Logic
io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  socket.emit('welcome', 'Connected to SmartLine live queue');

  socket.on('joinQueue', (data) => {
    console.log('User joined queue:', data);
    io.emit('queueUpdated', data);
  });

  socket.on('callNextUser', (data) => {
    console.log('Next user called:', data);
    io.emit('userCalled', data);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
