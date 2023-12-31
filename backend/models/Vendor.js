const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  contact:String,
  address:String,
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true
  },
  vendorCode:{
    type:String,
    unique:true,
    required:true,
  },
});

const Vendor = mongoose.model('Vendor',vendorSchema);

module.exports = Vendor;