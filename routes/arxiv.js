// routes/arxiv.js
const express = require('express');
const router = express.Router();
const { fetchArxivPapers } = require('../services/arxivService'); //fetching

// GET /api/arxiv?query=your_topic&start=0&max_results=10
router.get('/', async (req, res) => {
  const { query, start, max_results } = req.query;
  
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }
  
  try {
    const papers = await fetchArxivPapers(query, start || 0, max_results || 10);
    res.json({ papers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from arXiv' });
  }
});

module.exports = router;
