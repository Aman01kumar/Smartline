const express = require('express');
const router = express.Router();

// Temporary queue data (in-memory)
let queue = [];

/**
 * @route   GET /api/queue
 * @desc    Get current queue
 */
router.get('/', (req, res) => {
  res.status(200).json(queue);
});

/**
 * @route   POST /api/queue
 * @desc    Add a user to the queue
 */
router.post('/', (req, res) => {
  const { username } = req.body;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ message: 'Valid username is required' });
  }

  const newUser = {
    username,
    joinedAt: new Date(),
  };

  queue.push(newUser);
  res.status(201).json({
    message: 'User added to queue',
    user: newUser,
    queue,
  });
});

/**
 * @route   DELETE /api/queue
 * @desc    Clear the queue (admin use only)
 */
router.delete('/', (req, res) => {
  queue = [];
  res.status(200).json({ message: 'Queue cleared successfully' });
});

module.exports = router;
