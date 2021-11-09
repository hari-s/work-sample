import mongoose from 'mongoose';

import {
  clearInMemoryMongodb,
  closeInMemoryMongodConnection,
  connectInMemoryDB,
} from '../db/connect-in-memory';

describe('ConnectToInMemoryDB', () => {
  let db: mongoose.Mongoose;
  beforeAll(async () => {
    db = await connectInMemoryDB();
  });

  it('should initialize connection', () => {
    expect(db).toBeTruthy();
  });

  it('should clear all document data', async () => {
    const tempModel = db.model(
      'temp-document',
      new mongoose.Schema({ name: String })
    );
    await tempModel.create({ name: 'Gateway TechnoLabs' });
    const docCount = await tempModel.count({});
    expect(docCount).toBe(1);
    await clearInMemoryMongodb();
    const docCleanCount = await tempModel.count({});
    expect(docCleanCount).toBe(0);
  });

  afterAll(async () => {
    await closeInMemoryMongodConnection();
  });
});
