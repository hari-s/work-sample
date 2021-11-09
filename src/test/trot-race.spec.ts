import { TrotRaceMockWorker } from './__mock__';

jest.mock('worker_threads', () => {
  return {
    Worker: TrotRaceMockWorker,
  };
});

import {
  clearInMemoryMongodb,
  closeInMemoryMongodConnection,
  connectInMemoryDB,
} from '../db/connect-in-memory';
import { filter } from '../services/race-events.service';
import trotRaceConnectionInitilizer from '../trot-race';

describe('TrotRaceConnectionInitilizer (E2E)', () => {
  beforeAll(async () => {
    await connectInMemoryDB();
  });

  /**
   * Intergartion test verifies data from worker to mongodb
   */
  it('should create record into db while worker posts message', async () => {
    await trotRaceConnectionInitilizer();
    await new Promise((r) => setTimeout(r, 1000));
    const data = await filter();
    expect(data.length).toBe(1);
  });

  afterEach(async () => {
    await clearInMemoryMongodb();
  });

  afterAll(async () => {
    await closeInMemoryMongodConnection();
  });
});
