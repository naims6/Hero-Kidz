import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODB_URI
const dbName = process.env.DBNAME

if (!uri) throw new Error("MONGODB_URI missing");
if (!dbName) throw new Error("DBNAME missing");

export const collections = {
    PRODUCTS: "products",
}
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const dbConnect=(collectionName: string) => {
    return client.db(dbName).collection(collectionName)
}
