const express = require('express');
const router = express.Router();
const {
  createWebsite,
  getUserWebsites,
  getWebsiteById,
  updateWebsite,
  deleteWebsite,
} = require('../controllers/websiteController');
const { protect } = require('../middleware/auth');

// Website routes
router.route('/')
  .post(protect, createWebsite)
  .get(protect, getUserWebsites);

router.route('/:id')
  .get(protect, getWebsiteById)
  .put(protect, updateWebsite)
  .delete(protect, deleteWebsite);

module.exports = router;