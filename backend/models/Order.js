import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      quantity: { type: Number, required: true },
    }
  ],
  status: {
    type: String,
    enum: ['pending', 'preparing', 'paid', 'cancelled'],
    default: 'pending'
  },
  createdBy: { type: String }, // waiter’s name
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
