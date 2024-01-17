const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: String,
  address: String,
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  vendorCode: {
    type: String,
    unique: true,
  },
});

vendorSchema.pre('save', async function (next) {
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;