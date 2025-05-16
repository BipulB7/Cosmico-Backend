// services/arxivService.js
const axios = require('axios');
const xml2js = require('xml2js');

const ARXIV_API_URL = 'http://export.arxiv.org/api/query';

async function fetchArxivPapers(query, start = 0, max_results = 10) {
  try {
    // Construct the URL with query parameters
    const url = `${ARXIV_API_URL}?search_query=all:${encodeURIComponent(query)}&start=${start}&max_results=${max_results}`;
    console.log('Fetching from arXiv:', url);

    // Make the HTTP GET request
    const response = await axios.get(url);
    
    // Parse the XML response into JSON
    const parser = new xml2js.Parser({ explicitArray: false });
    const parsedResult = await parser.parseStringPromise(response.data);

    // The feed entries are in parsedResult.feed.entry (could be an array or single object)
    let entries = parsedResult.feed.entry;
    // Ensure entries is an array
    if (!Array.isArray(entries)) {
      entries = [entries];
    }

    // Map the entries to a simpler format
    const papers = entries.map(entry => ({
      id: entry.id,
      title: entry.title.trim(),
      summary: entry.summary.trim(),
      authors: Array.isArray(entry.author)
        ? entry.author.map(a => a.name)
        : [entry.author.name],
      published: entry.published,
      updated: entry.updated,
      link: entry.link?.[0]?.$.href || entry.link?.$.href || '',
      // You can extract more fields as needed
    }));

    return papers;
  } catch (error) {
    console.error('Error fetching arXiv papers:', error);
    throw error;
  }
}

module.exports = { fetchArxivPapers };
