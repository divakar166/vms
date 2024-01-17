require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const vendorRoutes = require('./routes/vendorRoutes');
const posRoutes = require('./routes/posRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/',vendorRoutes);
app.use('/',posRoutes);
app.use('/auth/',authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
