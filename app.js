require('dotenv').config();
const express = require('express');
const app = express();

// Basic middleware
app.use(express.json());

// Add server listener
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Test route
app.get('/', (req, res) => {
  res.send('Authentication System API');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'UP',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

module.exports = app;