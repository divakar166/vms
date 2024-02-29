const express = require('express');
const router = express.Router();
const PurchaseOrderController = require('../controllers/PosController');

router.get('/pos', PurchaseOrderController.getAllPurchaseOrders);
router.get('/pos/:po_number', PurchaseOrderController.getPurchaseOrderById);
router.post('/pos', PurchaseOrderController.createPurchaseOrder);
router.get('/orders/:id',PurchaseOrderController.getOrdersByVendor)
router.delete('/pos/:po_number', PurchaseOrderController.deletePurchaseOrder);
router.put('/pos/:po_number/update_status', PurchaseOrderController.updatePurchaseOrderStatus);

module.exports = router;
