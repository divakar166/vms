const Vendor = require('../models/Vendor');
const PerformanceMetrics = require('../models/PerformanceMetrics');

exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({status:'active'});
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllVendorsRequests = async (req, res) => {
  try {
    const vendors = await Vendor.find({status:'inactive'});
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.acceptVendorReq = async (req,res) => {
  try {
    const { id } = req.params;
    await Vendor.findByIdAndUpdate(id, { status: 'active' });
    res.status(200).json({ message: 'Vendor request accepted successfully' });
  } catch (error) {
    console.error('Error accepting vendor request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.rejectVendorReq = async (req,res) => {
  try {
    const { id } = req.params;
    await Vendor.findByIdAndUpdate(id, { status: 'rejected' });
    res.status(200).json({ message: 'Vendor request rejected successfully' });
  } catch (error) {
    console.error('Error rejecting vendor request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getAllVendorsPerformances = async (req,res) => {
  try {
    const activeVendors = await Vendor.find({ status: 'active' });
    const vendorIds = activeVendors.map(vendor => vendor._id);
    const performances = await PerformanceMetrics.find({ vendor: { $in: vendorIds } }).populate('vendor');
    res.json(performances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getVendorCode = async (req, res) => {
  const _id = req.params._id;
  try {
    const vendor = await Vendor.findById(_id);
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.json({ vendorCode: vendor.vendorCode });
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
    const latestVendor = await Vendor.findOne({}, {}, { sort: { vendorCode: -1 } });
    let latestNumber = 0;

    if (latestVendor) {
      const latestCode = latestVendor.vendorCode;
      const match = latestCode.match(/\d+/);
      latestNumber = match ? parseInt(match[0], 10) : 0;
    }

    const newNumber = latestNumber + 1;
    const paddedNumber = padNumber(newNumber, 3);
    const vendorCode = `VN${paddedNumber}`;

    const newVendor = new Vendor({
      name,
      contact,
      email,
      address,
      password,
      vendorCode
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

function padNumber(number, width) {
  const padded = number.toString().padStart(width, '0');
  return padded;
}

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