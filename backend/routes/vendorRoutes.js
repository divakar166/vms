const express = require('express');
const router = express.Router();
const VendorController = require('../controllers/vendorController');

router.get('/vendors', VendorController.getAllVendors);
router.get('/vendors/:_id',VendorController.getVendorCode);
router.get('/vendors/:vendorCode', VendorController.getVendorById);
router.get('/vendors/:vendorCode/performance', VendorController.getVendorPerformance);
router.get('/performance', VendorController.getAllVendorsPerformances);
router.post('/vendors', VendorController.createVendor);
router.delete('/vendors/:vendorCode', VendorController.deleteVendor);

module.exports = router;