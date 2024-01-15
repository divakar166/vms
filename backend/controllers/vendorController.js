const Vendor = require('../models/Vendor');
const PerformanceMetrics = require('../models/PerformanceMetrics');

exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVendorById = async (req, res) => {
  const { vendorCode } = req.params;

  try {
    const vendor = await Vendor.findOne({vendorCode});
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVendorPerformance = async (req, res) => {
  const { vendorCode } = req.params;

  try {
    const vendor = await Vendor.findOne({vendorCode});
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const performanceMetrics = await PerformanceMetrics.findOne({ vendor:vendor._id });
    
    res.json(performanceMetrics || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createVendor = async (req, res) => {
  const { name, contact, email, address,password } = req.body;

  try {
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor with this email already exists' });
    }

    const newVendor = new Vendor({
      name,
      contact,
      email,
      address,
      password
    });

    await newVendor.save();
    const newPerformanceMetrics = new PerformanceMetrics({
      vendor:newVendor._id,
    });
    await newPerformanceMetrics.save();

    res.status(201).json(newVendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVendor = async (req, res) => {
  const { vendorCode } = req.params;

  try {
    const vendor = await Vendor.findOne({ vendorCode });
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    await PerformanceMetrics.deleteOne({ vendor: vendor._id });

    await vendor.deleteOne();

    res.json({ message: 'Vendor and associated performance metrics deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};