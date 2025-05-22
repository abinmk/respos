import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  tableNumber: Number,
  items: [
    {
      itemName: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  paymentId: String,
  paymentSignature: String,
  paymentOrderId: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;