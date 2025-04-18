const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// ✅ Regex-safe allowed origins
const allowedOrigins = [
  /^https:\/\/.*netlify\.app$/,
  'http://localhost:3000',
];

app.options('*', cors());

app.use(cors({
  origin: function (origin, callback) {
    console.log('🔍 Incoming request origin:', origin);
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.some((o) =>
      typeof o === 'string' ? o === origin : o.test(origin)
    );
    return isAllowed
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  path: '/socket.io',
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// ✅ Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tokens', require('./routes/tokenRoutes'));
app.use('/api/queue', require('./routes/queueRoutes'));

// 🔁 Queue Storage (In-Memory)
let queue = [];

// ✅ Socket.IO Events
io.on('connection', (socket) => {
  console.log('🟢 Socket connected:', socket.id);
  socket.emit('welcome', 'Connected to SmartLine live queue');

  // User joins queue
  socket.on('joinQueue', (user) => {
    const alreadyInQueue = queue.find(u => u.id === user.id);
    if (!alreadyInQueue) {
      queue.push(user);
      console.log(`➕ ${user.email} added to queue`);
      io.emit('queueUpdated', { queue });
    } else {
      console.log(`⚠️ ${user.email} already in queue`);
    }
  });

  // Admin joins to get full queue
  socket.on('adminJoin', () => {
    console.log('🛠️ Admin joined');
    socket.emit('queueUpdated', { queue });
  });

  // Admin calls the next user
  socket.on('callNext', () => {
    if (queue.length > 0) {
      const nextUser = queue.shift();
      console.log(`📞 Calling: ${nextUser.email}`);
      io.emit('queueUpdated', { queue });
      io.emit('userCalled', nextUser); // ✅ Notify specific user
      io.emit('message', `📣 ${nextUser.email} has been called!`);
    } else {
      console.log('🚫 No users in queue');
      socket.emit('message', 'Queue is empty.');
    }
  });

  // User leaves the queue
  socket.on('leaveQueue', (userId) => {
    const before = queue.length;
    queue = queue.filter(u => u.id !== userId);
    const after = queue.length;
    if (before !== after) {
      console.log(`❌ User with ID ${userId} left the queue`);
      io.emit('queueUpdated', { queue });
    }
  });

  socket.on('disconnect', () => {
    console.log('🔴 Socket disconnected:', socket.id);
  });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Global error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ✅ Start Server
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
