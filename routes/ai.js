// routes/ai.js
const express = require('express');
const router = express.Router();
const { analyzeText } = require('../services/aiService');

// POST /api/ai/analyze
// Expects a JSON body with { text: "..." }
router.post('/analyze', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: "Text is required for analysis." });
  }

  try {
    const analysis = await analyzeText(text);
    res.json({ analysis });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
