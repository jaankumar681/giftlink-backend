
const express = require('express');
const router = express.Router();
const { client } = require('../models/db'); // Adjust path if your db connection file is elsewhere

// Ensure database connection before queries
async function connectToDatabase() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
}

// GET /api/search?category=someCategory
router.get('/', async (req, res) => {
  try {
    await connectToDatabase();

    const category = req.query.category;
    const query = category ? { category } : {};

    const results = await client
      .db('giftlink')       // change to your actual DB name
      .collection('gifts') // change to your collection name
      .find(query)
      .toArray();

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
