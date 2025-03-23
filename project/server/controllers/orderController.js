const Order = require('../models/Order');
const Website = require('../models/Website');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    const {
      websiteId,
      customer,
      products,
      totalAmount,
      paymentMethod,
    } = req.body;

    // Check if website exists
    const website = await Website.findById(websiteId);

    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    // Create order
    const order = await Order.create({
      website: websiteId,
      customer,
      products,
      totalAmount,
      paymentMethod,
    });

    if (order) {
      res.status(201).json(order);
    } else {
      res.status(400).json({ message: 'Invalid order data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get orders for website
// @route   GET /api/orders/website/:websiteId
// @access  Private
const getOrdersByWebsite = async (req, res) => {
  try {
    const website = await Website.findById(req.params.websiteId);

    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    // Check if the user is the owner of the website
    if (website.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const orders = await Order.find({ website: req.params.websiteId }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all orders for user's websites
// @route   GET /api/orders
// @access  Private
const getUserOrders = async (req, res) => {
  try {
    // Get all websites owned by the user
    const websites = await Website.find({ owner: req.user._id });
    const websiteIds = websites.map((website) => website._id);

    // Get all orders for these websites
    const orders = await Order.find({ website: { $in: websiteIds } })
      .populate('website', 'name domain')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'website',
      'name domain owner'
    );

    if (order) {
      // Get the website to check ownership
      const website = await Website.findById(order.website._id);

      // Check if the user is the owner of the website
      if (website.owner.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private
const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (order) {
      // Get the website to check ownership
      const website = await Website.findById(order.website);

      // Check if the user is the owner of the website
      if (website.owner.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      if (status) order.status = status;
      if (paymentStatus) order.paymentStatus = paymentStatus;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createOrder,
  getOrdersByWebsite,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
}; 