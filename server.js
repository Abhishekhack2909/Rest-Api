const express = require('express');
const path = require('path');
const notesRoutes = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS middleware for API requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/notes', notesRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Notes API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});