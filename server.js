const express = require('express');
const notesRoutes = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

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