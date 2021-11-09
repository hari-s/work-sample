import {
  clearInMemoryMongodb,
  closeInMemoryMongodConnection,
  connectInMemoryDB,
} from '../db/connect-in-memory';
import { create, findById } from '../services/race-events.service';
import { RaceEvent, RaceEventState } from '../utils';

const MOCK_EVENT: RaceEvent = {
  event: RaceEventState.Finish,
  horse: {
    id: 15,
    name: 'Nilly',
  },
  time: 11381,
};

describe('RaceEventService', () => {
  beforeAll(async () => {
    await connectInMemoryDB();
  });

  it('should create events', async () => {
    const reace = await create(MOCK_EVENT);
    expect(reace._id).toBeTruthy();
  });

  it('should find created events', async () => {
    const _raceEvent = await create(MOCK_EVENT);
    const filterRaceEvent = await findById(_raceEvent._id);
    expect(filterRaceEvent).toBeTruthy();
    expect(_raceEvent.id).toBe(filterRaceEvent?.id);
  });

  afterEach(async () => {
    await clearInMemoryMongodb();
  });

  afterAll(async () => {
    await closeInMemoryMongodConnection();
  });
});
