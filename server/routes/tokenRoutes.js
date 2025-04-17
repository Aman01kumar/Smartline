const express = require('express');
const router = express.Router();
const { createToken, getTokens } = require('../controllers/tokenController');

router.post('/', createToken);
router.get('/', getTokens);

module.exports = router;
