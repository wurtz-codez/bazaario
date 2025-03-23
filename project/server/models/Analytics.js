const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema(
  {
    website: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Website',
      required: true,
    },
    visitors: {
      total: { type: Number, default: 0 },
      daily: [
        {
          date: { type: Date },
          count: { type: Number, default: 0 },
        },
      ],
    },
    sales: {
      total: { type: Number, default: 0 },
      daily: [
        {
          date: { type: Date },
          count: { type: Number, default: 0 },
          amount: { type: Number, default: 0 },
        },
      ],
    },
    products: [
      {
        productId: { type: String },
        name: { type: String },
        sales: { type: Number, default: 0 },
        revenue: { type: Number, default: 0 },
      },
    ],
    customerDemographics: {
      ageGroups: {
        '18-24': { type: Number, default: 0 },
        '25-34': { type: Number, default: 0 },
        '35-44': { type: Number, default: 0 },
        '45-54': { type: Number, default: 0 },
        '55+': { type: Number, default: 0 },
      },
      gender: {
        male: { type: Number, default: 0 },
        female: { type: Number, default: 0 },
        other: { type: Number, default: 0 },
      },
      location: [
        {
          country: { type: String },
          count: { type: Number, default: 0 },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Analytics', AnalyticsSchema); 