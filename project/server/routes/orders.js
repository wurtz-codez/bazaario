const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Placeholder route until we implement orders fully
router.get('/', protect, (req, res) => {
  res.json([]);
});

module.exports = router;