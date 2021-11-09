import { RaceEvent } from 'utils/types';

import RaceEventModel, { RaceEventDocument } from '../schema/race-event.schema';

/**
 * Creates a new docuement for the race event
 * @param raceEvent - The data for the new race event
 * @returns {Promise<RaceEventDocument>}
 */
export const create = (raceEvent: RaceEvent): Promise<RaceEventDocument> => {
  return RaceEventModel.create({
    event: raceEvent.event,
    time: raceEvent.time,
    horse: {
      id: raceEvent.horse.id,
      name: raceEvent.horse.name,
    },
  });
};

/**
 * Returns a race event document by id
 * @param id race event document id
 * @returns
 */
export const findById = (id: string) => {
  return RaceEventModel.findById(id);
};

/**
 * Returns filtered race event documents
 * @param object
 * @returns Promise<RaceEventDocument[]>
 */
export const filter = (query = {}) => {
  return RaceEventModel.find(query);
};

export default {
  create,
  findById,
};
