import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongod: MongoMemoryServer;

/**
 * Helper function
 * Drops the in memory mongodb database and closes the connection
 */
export const closeInMemoryMongodConnection = async () => {
  if (mongod) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  }
};

/**
 * Helper function
 * Clears/Removes all the data from all the collections
 */
export const clearInMemoryMongodb = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

/**
 * Helper function
 * Connects to in memory mongodb
 * @returns {Promise<mongoose>}
 */
export const connectInMemoryDB = async () => {
  await closeInMemoryMongodConnection();
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  return mongoose.connect(uri);
};

export default {
  closeInMemoryMongodConnection,
  clearInMemoryMongodb,
  connectInMemoryDB,
};
