const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// ✅ Regex-safe allowed origins including dynamic Netlify previews
const allowedOrigins = [
  /^https:\/\/.*netlify\.app$/,      // Allow all netlify preview domains
  'http://localhost:3000'
];

// ✅ CORS Preflight handler (must come before route handlers)
app.options('*', cors());

// ✅ CORS middleware with origin logging
app.use(cors({
  origin: function (origin, callback) {
    console.log('🔍 Incoming request origin:', origin); // Debugging CORS
    if (!origin) return callback(null, true); // Allow mobile/postman/etc

    const isAllowed = allowedOrigins.some((o) => {
      if (typeof o === 'string') return o === origin;
      if (o instanceof RegExp) return o.test(origin);
      return false;
    });

    if (isAllowed) {
      return callback(null, true);
    } else {
      console.warn('❌ Blocked by CORS:', origin);
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ✅ Parse incoming JSON
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

// ✅ Connect to MongoDB
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

// ✅ Socket.IO Events
io.on('connection', (socket) => {
  console.log('🟢 Socket connected:', socket.id);

  socket.emit('welcome', 'Connected to SmartLine live queue');

  socket.on('joinQueue', (data) => {
    console.log('➕ User joined queue:', data);
    io.emit('queueUpdated', data);
  });

  socket.on('callNextUser', (user) => {
    console.log('📞 Calling next user:', user);
    io.emit('userCalled', user);
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
