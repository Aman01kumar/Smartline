const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe
} = require('../controllers/userController');

const {
  protect,
  adminOnly
} = require('../middleware/authMiddleware');

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/users/login
// @desc    Login user & return token
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/users/me
// @desc    Get current logged-in user's info
// @access  Private
router.get('/me', protect, getMe);

module.exports = router;
