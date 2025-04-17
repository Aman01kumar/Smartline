const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['waiting', 'served', 'cancelled'], default: 'waiting' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Token', tokenSchema);
