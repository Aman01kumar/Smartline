const express = require('express');
const router = express.Router();

// Temporary queue data (replace with DB logic later)
let queue = [];

// GET current queue
router.get('/', (req, res) => {
  res.json({ queue });
});

// POST - Join the queue
router.post('/', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ message: 'Username is required' });

  queue.push({ username, joinedAt: new Date() });
  res.status(201).json({ message: 'User added to queue', queue });
});

// DELETE - Clear the queue (admin use, optional)
router.delete('/', (req, res) => {
  queue = [];
  res.json({ message: 'Queue cleared' });
});

module.exports = router;
