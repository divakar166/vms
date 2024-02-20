const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const PerformanceMetrics = require('./PerformanceMetrics');

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
    unique: true
  },
  status:{
    type:String,
    default:'not active'
  }
});

vendorSchema.pre('save', async function (next) {
  const saltRounds = 10;
  if (!this.vendorCode) {
    this.vendorCode = await this.constructor.generateVendorCode();
  }
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

vendorSchema.statics.generateVendorCode = async function () {
  const latestVendor = await this.findOne({}, {}, { sort: { 'vendorCode': -1 } });
  if (!latestVendor) {
    return 'VN001';
  }
  const latestVendorCode = latestVendor.vendorCode;
  const numericPart = parseInt(latestVendorCode.slice(2), 10);
  const newNumericPart = numericPart + 1;
  return 'VN' + String(newNumericPart).padStart(3, '0');
};

vendorSchema.post('save', async function (vendor) {
  try {
    const existingPerformanceMetrics = await PerformanceMetrics.findOne({ vendor: vendor._id });
    if (!existingPerformanceMetrics) {
      const newPerformanceMetrics = new PerformanceMetrics({
        vendor: vendor._id
      });
      await newPerformanceMetrics.save();
    }
  } catch (error) {
    console.error('Error creating PerformanceMetrics for vendor:', error);
  }
});


const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;