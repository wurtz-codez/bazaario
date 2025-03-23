const express = require('express');
const router = express.Router();
const {
  getTemplates,
  getTemplateById,
  getTemplatesByCategory,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} = require('../controllers/templateController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/', getTemplates);
router.get('/:id', getTemplateById);
router.get('/category/:category', getTemplatesByCategory);

// Admin routes
router.post('/', protect, admin, createTemplate);
router.put('/:id', protect, admin, updateTemplate);
router.delete('/:id', protect, admin, deleteTemplate);

module.exports = router; 