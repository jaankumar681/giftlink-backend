const express = require('express');
const router = express.Router();
const { client } = require('../models/db');  // Import MongoDB client
const connectToDatabase = async () => {
  if (!client.isConnected()) {
    await client.connect();
  }
};

// Route to get all gifts
router.get('/', async (req, res) => {
  try {
    await connectToDatabase();
    const gifts = await client.db('giftlink').collection('gifts').find().toArray();
    res.json(gifts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get gift by ID
router.get('/:id', async (req, res) => {
  try {
    await connectToDatabase();
    const gift = await client.db('giftlink').collection('gifts').findOne({ _id: new ObjectId(req.params.id) });
    res.json(gift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
