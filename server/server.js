const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load .env
dotenv.config();

const app = express();

// CORS: allow frontend domain
const corsOptions = {
  origin: ['https://smartline-frontend.netlify.app', 'http://localhost:3000'],
  credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: corsOptions,
  path: "/socket.io"
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tokens', require('./routes/tokenRoutes'));
app.use('/api/queue', require('./routes/queueRoutes'));

// Socket.IO logic
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

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
