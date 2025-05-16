// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Mount the arXiv route
const arxivRoutes = require('./routes/arxiv');
const aiRoutes = require('./routes/ai');

// Mount the routes
app.use('/api/arxiv', arxivRoutes);
app.use('/api/ai', aiRoutes);

// Existing routes...
app.get('/', (req, res) => {
  res.send('Cosmico Backend is running...');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


