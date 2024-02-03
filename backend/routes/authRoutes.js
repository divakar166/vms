const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.get('/vendor', verifyToken, authController.getVendor);
router.get('/purchase-orders', verifyToken, authController.getPurchaseOrders);

module.exports = router;