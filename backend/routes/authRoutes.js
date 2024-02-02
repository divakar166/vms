const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');

router.post('/login', async (req, res) => {
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
    const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:'1h'});
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/vendor', verifyToken, async (req, res) => {
  try {
    const user = await Vendor.findById(req.user.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;