const express = require('express');
const router = express.Router();
const VendorController = require('../controllers/vendorController');

router.get('/vendors', VendorController.getAllVendors);
router.get('/vendorsReq', VendorController.getAllVendorsRequests);
router.put('/vendorsReq/:id/accept',VendorController.acceptVendorReq);
router.put('/vendorsReq/:id/reject',VendorController.rejectVendorReq);
router.get('/vendors/:identifier', VendorController.getVendorByIdentifier);
router.get('/vendors/:vendorCode/performance', VendorController.getVendorPerformance);
router.get('/performance', VendorController.getAllVendorsPerformances);
router.post('/vendors', VendorController.createVendor);
router.delete('/vendors/:vendorCode', VendorController.deleteVendor);

module.exports = router;