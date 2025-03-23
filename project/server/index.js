const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Set NODE_ENV default if not provided in the environment
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

console.log(`Running in ${process.env.NODE_ENV} mode`);

// Create Express app
const app = express();

// CORS Configuration - Enhanced to fix CORS issues
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],  // Allow requests from React dev server with both localhost and IP
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Additional headers to ensure CORS works
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('BAZAARIO API is running');
});

// For preflight OPTIONS requests
app.options('*', cors());

// Preview route for websites (this should be before API routes to catch all preview URLs)
app.use('/preview', require('./routes/preview'));

// API Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/websites', require('./routes/websites'));
app.use('/api/templates', require('./routes/templates'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/analytics', require('./routes/analytics'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : null
  });
});

// MongoDB connection
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit with failure
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});