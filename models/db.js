// models/db.js
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function connectToDatabase() {
  if (!client.isConnected?.()) {
    await client.connect();
  }
  console.log('Connected to MongoDB');
  return client.db('giftlink'); // your database name
}

module.exports = { connectToDatabase };
