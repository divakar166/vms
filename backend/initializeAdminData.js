const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');
require('dotenv').config();

async function initializeAdminData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const count = await Admin.countDocuments();
    if (count === 0) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash('admin', saltRounds);
      const newAdmin = new Admin({
        username: 'admin',
        password: hashedPassword
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
