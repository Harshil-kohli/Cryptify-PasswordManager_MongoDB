import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
const dbName = 'passop'

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).end()

  try {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const result = await collection.deleteOne(req.body)
    res.status(200).json({ success: true, result })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}
