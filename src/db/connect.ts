import mongoose from 'mongoose';

import { environment } from '../config';

export async function connectToMongoDB(): Promise<void> {
  try {
    const mongoDbConnectionString = environment.trotRaceMongoDBUri;
    await mongoose.connect(mongoDbConnectionString);
  } catch (err) {
    return Promise.reject(err);
  }
}
