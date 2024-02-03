const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');
const PurchaseOrder = require('../models/Pos');

const login = async (req, res) => {
  try {
    const { vendorCode, password } = req.body;

    const vendor = await Vendor.findOne({ vendorCode });

    if (!vendor) {
      return res.status(401).json({ message: 'Vendor not found!' });
    }

    const passwordMatch = await bcrypt.compare(password, vendor.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password!' });
    }

    const payload = {
      id: vendor._id,
      email: vendor.email,
      vendorCode: vendor.vendorCode,
      name: vendor.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getVendor = async (req, res) => {
  try {
    const user = await Vendor.findById(req.user.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const getPurchaseOrders = async (req,res) => {
  try {
    const userId = req.user.id;
    const purchaseOrders = await PurchaseOrder.find({ 'vendor': userId });
    res.json(purchaseOrders);
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { login, getVendor, getPurchaseOrders };
