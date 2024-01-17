const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');

exports.login = async (req, res) => {
  try {
    const { vendorCode, password } = req.body;
    console.log(vendorCode,password)

    const vendor = await Vendor.findOne({ vendorCode });

    if (!vendor) {
      return res.status(401).json({ message: 'Vendor not found!' });
    }

    const passwordMatch = await bcrypt.compare(password, vendor.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password!' });
    }

    const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
