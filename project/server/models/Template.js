const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['restaurant', 'ecommerce', 'clothing', 'electronics', 'services', 'other'],
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    previewUrl: {
      type: String,
      required: true,
    },
    features: [String],
    settings: {
      colors: {
        primary: { type: String, default: '#3f51b5' },
        secondary: { type: String, default: '#f50057' },
        background: { type: String, default: '#ffffff' },
        text: { type: String, default: '#333333' },
        accent: { type: String, default: '#4caf50' },
      },
      fonts: {
        heading: { type: String, default: 'Roboto' },
        body: { type: String, default: 'Open Sans' },
      },
      layout: {
        headerStyle: { type: String, default: 'standard' },
        footerStyle: { type: String, default: 'standard' },
        contentWidth: { type: String, default: 'contained' },
        productDisplayStyle: { type: String, default: 'grid' },
      },
    },
    pages: [
      {
        name: { type: String },
        slug: { type: String },
        content: { type: String },
      }
    ],
    defaultProducts: [
      {
        name: { type: String },
        description: { type: String },
        price: { type: Number },
        imageUrl: { type: String },
        category: { type: String },
      }
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Template', TemplateSchema);