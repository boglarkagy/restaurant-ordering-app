import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  status: {
    type: String,
    enum: ['pending', 'preparing', 'paid', 'cancelled'],
    default: 'pending',
  },
  createdBy: { type: String, required: true }, // waiter’s name
  totalAmount: { type: Number, default: 0 },
}, { timestamps: true });

// calculate totalAmount before saving
orderSchema.pre('validate', async function(next) {
  if (this.items && this.items.length > 0) {
    let total = 0;
    for (const orderItem of this.items) {
      const item = await mongoose.model('Item').findById(orderItem.item);
      if (item) total += item.price * orderItem.quantity;
    }
    this.totalAmount = total;
  }
  next();
});

// calculate totalAmount before findOneAndUpdate
orderSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  if (update.items && update.items.length > 0) {
    let total = 0;
    for (const orderItem of update.items) {
      const item = await mongoose.model('Item').findById(orderItem.item);
      if (item) total += item.price * orderItem.quantity;
    }
    update.totalAmount = total;
  }
  next();
});

export default mongoose.model('Order', orderSchema);
