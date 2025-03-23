const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Template = require('../models/Template');
const templates = require('../data/templateSeeds');

// Load environment variables
dotenv.config();

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully.');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Import templates
const importTemplates = async () => {
  try {
    await Template.deleteMany({}); // Clear existing templates
    console.log('Existing templates cleared');

    await Template.insertMany(templates);
    console.log(`${templates.length} templates imported successfully`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error importing templates:', error.message);
    process.exit(1);
  }
};

// Run the script
connectDB().then(() => importTemplates());
