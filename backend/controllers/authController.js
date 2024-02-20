const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');
const PurchaseOrder = require('../models/Pos');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.status(401).json({ message: 'Vendor not found!' });
    }
    if(vendor.status != 'active'){
      return res.status(401).json({ message: 'Account not active!' });
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

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const vendor = await Vendor.findOne({ email });

    if (vendor) {
      return res.status(401).json({ message: 'Vendor with this email already exist' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newVendor = new Vendor({
      name,
      email,
      password: hashedPassword
    });
    await newVendor.save();
    res.status(201).json({ message: 'Registration successful! Pending for approval.' });
  } catch (error) {
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

module.exports = { login, register, getVendor, getPurchaseOrders };
