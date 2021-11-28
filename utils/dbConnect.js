// import mongoose from "mongoose";

// const connection = {};

// async function dbConnect() {
//   if (connection.isConnected) {
//     return;
//   }

//   const db = await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   connection.isConnected = db.connections[0].readyState;
//   console.log(connection.isConnected);
// }

// export default dbConnect;

import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGO_URI;
const MONGODB_DB = process.env.DB_NAME;

// check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environmental variable");
}

// check the MongoDB DB
if (!MONGODB_DB) {
  throw new Error("Define the MONGODB_DB environmental variable");
}

let cachedClient = null;
let cachedDb = null;

export async function dbConnect() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to cluster
  let client = new MongoClient(MONGODB_URI, opts);
  await client.connect();
  let db = client.db(MONGODB_DB);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
