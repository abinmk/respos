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

// Add Item
exports.addItem = async (req, res) => {
  const { tableNum, itemName, price } = req.body;

  if (!itemName || !price || !tableNum) {
    return res.status(400).json({ message: "Missing required fields" });
  }

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
      return res.status(200).json({ message: "Item quantity updated", item: updatedItem });
    } else {
      const newItem = new TableOrder({ itemName, price });
      await newItem.save();
      return res.status(201).json({ message: "Item added successfully", item: newItem });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add item" });
  }
};

// Remove Item
exports.removeItem = async (req, res) => {
  const { tableNum, itemName } = req.body;

  if (!itemName || !tableNum) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const collectionName = `table_${tableNum}`;
    const TableOrder = mongoose.models[collectionName] || mongoose.model(collectionName, orderItemSchema, collectionName);

    const existingItem = await TableOrder.findOne({ itemName });

    if (!existingItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
      await existingItem.save();
      return res.status(200).json({ message: "Item quantity decreased", item: existingItem });
    } else {
      await TableOrder.deleteOne({ _id: existingItem._id });
      return res.status(200).json({ message: "Item removed from order", item: existingItem });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove item" });
  }
};

// Get Table Details
exports.getTableDetails = async (req, res) => {
  const { tableNumber } = req.params;

  if (!tableNumber) {
    return res.status(400).json({ message: "Table number is required" });
  }

  try {
    const collectionName = `table_${tableNumber}`;
    const TableOrder = mongoose.models[collectionName] || mongoose.model(collectionName, orderItemSchema, collectionName);

    const items = await TableOrder.find(); // Get all items for this table

    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch table details" });
  }
};