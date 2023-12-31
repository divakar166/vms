const mongoose = require('mongoose');

const performanceMetricsSchema = new mongoose.Schema({
  vendor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Vendor',
    required:true,
  },
  on_time_delivery_rate: {
    type: Number,
    default: 0.0,
  },
  quality_rating_avg: {
    type: Number,
    default: 0.0,
  },
  average_response_time: {
    type: Number,
    default: 0.0,
  },
  fulfillment_rate: {
    type: Number,
    default: 0.0,
  },
});

const PerformanceMetrics = mongoose.model('PerformanceMetrics', performanceMetricsSchema);

module.exports = PerformanceMetrics;