const mongoose = require('mongoose');

const WebsiteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
      default: '',
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
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
      features: {
        enableCart: { type: Boolean, default: true },
        enableWishlist: { type: Boolean, default: true },
        enableSearch: { type: Boolean, default: true },
        enableReviews: { type: Boolean, default: true },
        enableBlog: { type: Boolean, default: false },
      },
      social: {
        facebook: { type: String, default: '' },
        instagram: { type: String, default: '' },
        twitter: { type: String, default: '' },
        youtube: { type: String, default: '' },
      },
      seo: {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        keywords: { type: String, default: '' },
      },
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      }
    ],
    pages: [
      {
        name: { type: String },
        slug: { type: String },
        content: { type: String },
        isPublished: { type: Boolean, default: true },
      }
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Website', WebsiteSchema);