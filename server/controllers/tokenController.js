const Token = require('../models/Token');

const createToken = async (req, res) => {
  const { userId, priority } = req.body;
  try {
    const token = await Token.create({ user: userId, priority });

    const io = req.app.get('socketio');
    io.emit('new_token', token);

    res.status(201).json(token);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getTokens = async (req, res) => {
  try {
    const tokens = await Token.find().populate('user');
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createToken, getTokens };
