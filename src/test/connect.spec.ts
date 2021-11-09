import { environment } from '../config';
jest.mock('mongoose', () => {
  return {
    connect: jest.fn((str: string) => {
      return Promise.resolve(str);
    }),
  };
});
import mongoose from 'mongoose';

import { connectToMongoDB } from '../db/connect';

describe.only('Connect', () => {
  it('should connect to db while calling connectToMongoDB', async () => {
    const spyMongooseConnect = jest.spyOn(mongoose, 'connect');
    await connectToMongoDB();
    expect(spyMongooseConnect).toHaveBeenCalled();
    expect(spyMongooseConnect).toHaveBeenCalledWith(
      environment.trotRaceMongoDBUri
    );
  });
});
