const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');
require('dotenv').config();

async function initializeAdminData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const count = await Admin.countDocuments();
    if (count === 0) {
      const newAdmin = new Admin({
        name: 'Divakar Singh',
        email:'admin@vms.com',
        password: 'admin'
      });
      await newAdmin.save();
      console.log('Admin data added successfully');
    } else {
      console.log('Admin data already exists, skipping initialization');
    }
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error initializing admin data:', error);
  }
}

initializeAdminData();
