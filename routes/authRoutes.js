const express = require('express');
const router = express.Router();
const { client } = require('../models/db');
const { ObjectId } = require('mongodb');

async function connectToDatabase() {
  if (!client.isConnected()) {
    await client.connect();
  }
}

router.get('/currentUser/:id', async (req, res) => {
  try {
    await connectToDatabase();
    const userId = req.params.id;
    const user = await client.db('giftlink').collection('users').findOne({ _id: new ObjectId(userId) });

    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
