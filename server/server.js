// server.js
const express = require('express');
const http = require('http'); // For socket server
const { Server } = require('socket.io'); // Socket.IO
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const tokenRoutes = require('./routes/tokenRoutes');


dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tokens', tokenRoutes);

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ MongoDB error:', err));
  
// --- Socket.IO logic ---
io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  // Example: emit welcome message
  socket.emit('welcome', 'Connected to SmartLine live queue');

  // Custom event handlers
  socket.on('joinQueue', (data) => {
    console.log('User joined queue:', data);
    io.emit('queueUpdated', data); // Notify all users
  });

  socket.on('callNextUser', (data) => {
    console.log('Next user called:', data);
    io.emit('userCalled', data); // Notify all users
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
