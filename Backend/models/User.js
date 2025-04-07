const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
  role: { type: String, enum: ['waiter', 'cashier', 'admin'], default: 'waiter' }
});

module.exports = mongoose.model("User", userSchema);