const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  itemName: { type: String, default: null },
  itemPrice: { type: Number, default: null },
  isItemOnSale: { type: Boolean, default: null },
  itemSalePrice: { type: Number, default: null },
});

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  pastOrders: [orderSchema],
});

module.exports = mongoose.model('user', userSchema);
