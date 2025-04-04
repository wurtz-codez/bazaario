const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createOrder,
  getOrdersByWebsite,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', protect, getUserOrders);
router.get('/website/:websiteId', protect, getOrdersByWebsite);
router.get('/:id', protect, getOrderById);
router.put('/:id', protect, updateOrderStatus);

module.exports = router;