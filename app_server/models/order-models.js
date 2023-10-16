const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phno: { type: String, required: true },
  dish: { type: String, required: true },
  quantity: { type: Number, required: true },
  notes: String,
  address:String,
  totalPrice: Number,
  createdOn: { type: Date, default: Date.now },
});

mongoose.model('Order', orderSchema);
