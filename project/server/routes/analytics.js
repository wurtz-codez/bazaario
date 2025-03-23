const express = require('express');
const router = express.Router();
const {
  getWebsiteAnalytics,
  updateWebsiteVisitors,
  getUserAnalytics,
  updateAnalyticsAfterOrder,
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

// Public routes
router.put('/website/:websiteId/visitors', updateWebsiteVisitors);

// Protected routes
router.get('/', protect, getUserAnalytics);
router.get('/website/:websiteId', protect, getWebsiteAnalytics);
router.post('/order', protect, updateAnalyticsAfterOrder);

module.exports = router;