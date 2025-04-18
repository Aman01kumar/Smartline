const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    status: {
      type: String,
      enum: ['waiting', 'served', 'cancelled'],
      default: 'waiting'
    }
  },
  {
    timestamps: true // Automatically manages createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Token', tokenSchema);
