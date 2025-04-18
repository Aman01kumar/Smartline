const express = require('express');
const router = express.Router();
const { createToken, getTokens } = require('../controllers/tokenController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// @route   POST /api/tokens
// @desc    Create a new token (e.g., user joins queue)
// @access  Protected
router.post('/', protect, createToken);

// @route   GET /api/tokens
// @desc    Get all tokens (e.g., for admin view)
// @access  Admin only
router.get('/', protect, adminOnly, getTokens);

module.exports = router;
