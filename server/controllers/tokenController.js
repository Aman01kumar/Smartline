const Token = require('../models/Token');

// Create a new token
const createToken = async (req, res) => {
  const { userId, priority } = req.body;

  if (!userId || !priority) {
    return res.status(400).json({ message: 'User ID and priority are required' });
  }

  try {
    const token = await Token.create({ user: userId, priority });

    // Emit the new token event via Socket.IO
    const io = req.app.get('socketio');
    io.emit('new_token', token);

    res.status(201).json(token);
  } catch (error) {
    console.error('Error creating token:', error);
    res.status(500).json({ message: 'Server error while creating token' });
  }
};

// Get all tokens
const getTokens = async (req, res) => {
  try {
    const tokens = await Token.find().populate('user');
    res.status(200).json(tokens);
  } catch (error) {
    console.error('Error fetching tokens:', error);
    res.status(500).json({ message: 'Server error while fetching tokens' });
  }
};

module.exports = {
  createToken,
  getTokens
};
