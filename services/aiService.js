// services/aiService.js
const axios = require('axios');

const HF_API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill"; // A free chatbot model
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

async function analyzeText(promptText) {
  if (!HF_API_KEY) {
    throw new Error("HUGGINGFACE_API_KEY is missing from environment variables.");
  }

  try {
    const response = await axios.post(
      HF_API_URL,
      { inputs: promptText },
      {
        headers: { Authorization: `Bearer ${HF_API_KEY}` },
      }
    );

    if (response.data.error) {
      throw new Error(`Hugging Face API Error: ${response.data.error}`);
    }

    return response.data[0]?.generated_text || "No response from model.";
  } catch (error) {
    console.error("Error calling Hugging Face API:", error.message);
    throw new Error("Failed to analyze text using Hugging Face API.");
  }
}

module.exports = { analyzeText };
