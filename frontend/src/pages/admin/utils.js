export const VendorColumns = [
  {
    Header:'Vendor Code',
    accessor:'vendorCode',
  },
  {
    Header:'Name',
    accessor:'name',
  },
  {
    Header:'Email',
    accessor:'email',
  },
  {
    Header:'Edit',
    accessor:'edit',
  },
];

export const RequestsColumns = [
  {
    Header:'Vendor Code',
    accessor:'vendorCode',
  },
  {
    Header:'Name',
    accessor:'name',
  },
  {
    Header:'Email',
    accessor:'email',
  },
  {
    Header:'Action',
    accessor:'action',
  },
];

export const OrdersColumn = [
  {
    Header:'PO Number',
    accessor:'po_number',
  },
  {
    Header:'Order Date',
    accessor:'order_date',
  },
  {
    Header:'Delivery Date',
    accessor:'delivery_date',
  },
  {
    Header:'Assigned To',
    accessor:'vendor',
  },
  {
    Header:'Status',
    accessor:'status',
  },
  {
    Header:'Edit',
    accessor:'edit',
  },
];

export const AdminOrdersColumn = [
  {
    Header:'PO Number',
    accessor:'po_number',
  },
  {
    Header:'Order Date',
    accessor:'order_date',
  },
  {
    Header:'Delivery Date',
    accessor:'delivery_date',
  },
  {
    Header:'Assigned To',
    accessor:'vendor',
  },
  {
    Header:'Status',
    accessor:'status',
  },
];

export const PerfColumn = [
  {
    Header:'Vendor Code',
    accessor:'vendor.vendorCode',
  },
  {
    Header:'On-Time Delivery Rate',
    accessor:'on_time_delivery_rate',
  },
  {
    Header:'Quality Rating',
    accessor:'quality_rating_avg',
  },
  {
    Header:'Avg. Response Time',
    accessor:'average_response_time',
  },
  {
    Header:'Fulfillment Rate',
    accessor:'fulfillment_rate'
  }
];