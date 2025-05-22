
import mongoose from 'mongoose';
import Menu from '../models/Menu.js';
import Order from '../models/Order.js';

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
export const addItem = async (req, res) => {
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
export const removeItem = async (req, res) => {
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
export const getTableDetails = async (req, res) => {
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

// Clear Table
export const clearTable = async (req, res) => {
  const { tableNumber } = req.params;

  if (!tableNumber) {
    return res.status(400).json({ message: "Table number is required" });
  }

  try {
    const collectionName = `table_${tableNumber}`;
    const TableOrder = mongoose.models[collectionName] || mongoose.model(collectionName, orderItemSchema, collectionName);

    await TableOrder.deleteMany({}); // Clear all items

    res.status(200).json({ message: `Table ${tableNumber} cleared successfully.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to clear table" });
  }
};


export const addMenuItem = async (req, res) => {
  const { name, image, price } = req.body;

  if (!name || !image || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newItem = new Menu({ name, image, price });
    await newItem.save();
    res.status(201).json({ message: 'Menu item added', item: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getMenuItems = async (req, res) => {
  try {
    const items = await Menu.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// POST /api/orders

export const checkoutOrder = async (req, res) => {
  const { tableNumber, items, totalAmount, paymentId, paymentSignature, paymentOrderId, timestamp } = req.body;

  try {
    const newOrder = new Order({
      tableNumber,
      items,
      totalAmount,
      paymentId,
      paymentSignature,
      paymentOrderId,
      timestamp,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order saved successfully" });
  } catch (error) {
    console.error("Order Save Error:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
};

// GET /api/orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ timestamp: -1 }); // Optional: sorted by newest first
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

// DELETE /api/menu/:id
export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Menu item ID is required' });
  }

  try {
    const deletedItem = await Menu.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item deleted successfully', item: deletedItem });
  } catch (error) {
    console.error('Delete Menu Item Error:', error);
    res.status(500).json({ message: 'Failed to delete menu item', error });
  }
};