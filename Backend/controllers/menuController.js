const mongoose = require("mongoose");
const Order = require('../models/Order');

// Define the schema
const orderItemSchema = new mongoose.Schema({
  itemName: String,
  price: Number,
  quantity: {
    type: Number,
    default: 1,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

exports.addItem = async (req, res) => {
  const { tableNum, itemName, price } = req.body;

  try {
    const collectionName = `table_${tableNum}`;
    const TableOrder = mongoose.model(collectionName, orderItemSchema, collectionName);

    // Attempt to find and update the existing item
    const updatedItem = await TableOrder.findOneAndUpdate(
      { itemName, price },
      { $inc: { quantity: 1 } },
      { new: true }
    );

    if (updatedItem) {
      // If the item exists and was updated
      return res.status(200).json({ message: "Item quantity updated", item: updatedItem });
    } else {
      // If the item doesn't exist, create a new one
      const newItem = new TableOrder({ itemName, price });
      await newItem.save();
      return res.status(201).json({ message: "Item added successfully", item: newItem });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add item" });
  }
};
exports.removeItem = async (req, res) => {
    const { tableNum, itemName } = req.body;
  
    try {
      const collectionName = `table_${tableNum}`;
      const TableOrder =
        mongoose.models[collectionName] ||
        mongoose.model(collectionName, orderItemSchema, collectionName);
  
      // Find the item
      const existingItem = await TableOrder.findOne({ itemName });
  
      if (!existingItem) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      if (existingItem.quantity > 1) {
        // Decrement quantity
        existingItem.quantity -= 1;
        await existingItem.save();
        return res.status(200).json({ message: "Item quantity decreased", item: existingItem });
      } else {
        // Remove item
        await TableOrder.deleteOne({ _id: existingItem._id });
        return res.status(200).json({ message: "Item removed from order",quantity:existingItem.quantity });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to remove item" });
    }
  };


  exports.getTableDetails = async (req, res) => {
    try {
      const { tableNumber } = req.params;
      const order = await Order.findOne({ tableNumber }); // Query your MongoDB collection
      
      if (!order) {
        return res.status(404).json({ message: "Order not found for this table." });
      }
  
      res.json(order); // Return the order data
    } catch (err) {
      res.status(500).json({ message: "Server error." });
    }
  };
  
  