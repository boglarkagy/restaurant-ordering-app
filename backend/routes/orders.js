import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// GET all orders
router.get('/', async (req, res) => {
  const orders = await Order.find().populate('items.item');
  res.json(orders);
});

// POST new order
router.post('/', async (req, res) => {
  const newOrder = new Order(req.body);
  const saved = await newOrder.save();
  res.status(201).json(saved);
});

// PUT update order
router.put('/:id', async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE order
router.delete('/:id', async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order deleted' });
});

export default router;
