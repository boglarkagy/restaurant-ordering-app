import express from 'express';
import Order from '../models/Order.js';
import Item from '../models/Item.js';

const router = express.Router();

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.item');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new order
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saved = await newOrder.save();
    await saved.populate('items.item');
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update order
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    Object.assign(order, req.body);
    const saved = await order.save();
    await saved.populate('items.item');
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE order
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
