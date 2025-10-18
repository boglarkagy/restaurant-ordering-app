import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import itemsRouter from './routes/items.js';
import ordersRouter from './routes/orders.js';

dotenv.config({ path: './.env' });
console.log("MONGO_URI:", process.env.MONGO_URI); // ideiglenes teszt

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Enable routes
app.use('/api/items', itemsRouter);
app.use('/api/orders', ordersRouter);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
