const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the verified JWT token
    const { totalAmount, items } = req.body; // items should be an array of { product_id, quantity, price }

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items provided for the order' });
    }

    const newOrder = await Order.create(userId, totalAmount, items);
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.findByUserId(userId);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};