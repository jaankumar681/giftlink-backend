
  GNU nano 8.5                                                                       app.js                                                                       Modified
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import routes
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');

// Use routes
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);

module.exports = app;











