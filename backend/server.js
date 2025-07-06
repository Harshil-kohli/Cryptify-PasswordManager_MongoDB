const express = require('express')
const app = express()
const port = 3000
const dotenv=require('dotenv')
dotenv.config() // Load environment variables from .env file
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors=require('cors')
app.use(cors()) 
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017'; //const{mong...............myproject -> this is taken from mongodb-npm.
const client = new MongoClient(url);                      
const dbName = 'passop'; // Database Name

client.connect();

// Get all the passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// Save the password
app.post('/', async (req, res) => {
  const password=req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({success:true,result:findResult})
})

// Delete the password
app.delete('/', async (req, res) => {
  const password=req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({success:true,result:findResult})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})