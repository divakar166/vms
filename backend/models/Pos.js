// server/models/PurchaseOrder.js
const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  po_number: {
    type: String,
    unique: true,
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  delivery_date: {
    type: Date,
    default: null,
  },
  completion_date: {
    type: Date,
    default: null,
  },
  items: {
    type: mongoose.Schema.Types.Mixed,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  quality_rating: {
    type: Number,
    default: null,
  },
  issue_date: {
    type: Date,
    default: Date.now,
  },
  acknowledgment_date: {
    type: Date,
    default: null,
  },
});

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);

module.exports = PurchaseOrder;