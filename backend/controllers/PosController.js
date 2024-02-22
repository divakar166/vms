const PurchaseOrder = require('../models/Pos');
const Vendor = require('../models/Vendor');

exports.getAllPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find();
    res.json(purchaseOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPurchaseOrderById = async (req, res) => {
  const { po_number } = req.params;

  try {
    const purchaseOrder = await PurchaseOrder.findOne({po_number});
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'PurchaseOrder not found' });
    }
    res.json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPurchaseOrder = async (req, res) => {
  const { vendorCode, delivery_date, items, quantity } = req.body;
  try {
    const existingVendor = await Vendor.findOne({vendorCode});
    if (!existingVendor) {
      return res.status(400).json({ message: 'Vendor not found' });
    }
    const latestPO = await PurchaseOrder.findOne({}, {}, { sort: { po_number: -1 } });
    let latestNumber = 0;

    if (latestPO) {
      const latestCode = latestPO.po_number;
      const match = latestCode.match(/\d+/);
      latestNumber = match ? parseInt(match[0], 10) : 0;
    }

    const newNumber = latestNumber + 1;
    const paddedNumber = padNumber(newNumber, 3);
    const po_number = `PO${paddedNumber}`;

    const newPurchaseOrder = new PurchaseOrder({
      po_number,
      vendor:existingVendor._id,
      delivery_date,
      items,
      quantity
    });

    await newPurchaseOrder.save();

    res.status(201).json(newPurchaseOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function padNumber(number, width) {
  const padded = number.toString().padStart(width, '0');
  return padded;
}

exports.updatePurchaseOrder = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(id, updateFields, { new: true });

    if (!purchaseOrder) {
      return res.status(404).json({ message: 'PurchaseOrder not found' });
    }

    res.json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePurchaseOrder = async (req, res) => {
  const { po_number } = req.params;

  try {
    const purchaseOrder = await PurchaseOrder.findOneAndDelete({po_number});

    if (!purchaseOrder) {
      return res.status(404).json({ message: 'PurchaseOrder not found' });
    }

    res.json({ message: 'PurchaseOrder deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.acknowledgePurchaseOrder = async (req, res) => {
  const { po_number } = req.params;
  const { vendorCode } = req.body;

  try {
    const purchaseOrder = await PurchaseOrder.findOne({po_number});
    if(!purchaseOrder){
      return res.status(404).json({message:"Purchase Order not found!"});
    }
    if (purchaseOrder.acknowledgment_date !== null) {
      return res.status(400).json({ message: 'PurchaseOrder has already been acknowledged' });
    }
    const requestingVendor = await Vendor.findOne({ vendorCode });
    if (!requestingVendor) {
      return res.status(400).json({ message: 'Vendor not found' });
    }
    if (purchaseOrder.vendor.toString() !== requestingVendor._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized: Requesting vendor does not match the assigned vendor' });
    }

    purchaseOrder.acknowledgment_date = new Date();
    await purchaseOrder.save();

    res.json({ message: 'PurchaseOrder acknowledged successfully',acknowledgment_date: purchaseOrder.acknowledgment_date});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePurchaseOrderStatus = async (req, res) => {
  const { po_number } = req.params;
  const { status } = req.body;

  try {
    const purchaseOrder = await PurchaseOrder.findOne({po_number});
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'PurchaseOrder not found' });
    }
    if (purchaseOrder.status === 'pending') {
      purchaseOrder.status = status;
      await purchaseOrder.save();
      return res.json({ message: `PurchaseOrder status updated to ${status}` });
    } else {
      return res.json({ message: 'PurchaseOrder status is already updated!' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};