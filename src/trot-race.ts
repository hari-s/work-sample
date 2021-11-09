import { Worker } from 'worker_threads';

import { create } from './services/race-events.service';
import { RaceEvent } from './utils/types';

/**
 * Handles posted race event message by worker
 * @param raceEvent: race event object
 */
const workerResponseHandler = (raceEvent: RaceEvent) => {
  return create(raceEvent)
    .then(() => {
      console.log(
        `[${new Date().toLocaleTimeString()}] race event recorded into db`
      );
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Handles error thrown by worker
 * @param err: error oject
 */
const workerErrorHandler = (err: Error) => {
  throw err;
};

/**
 * Initializes connection with the trot race worker
 */
const trotRaceConnectionInitilizer = () => {
  const trotRaceStatusWorker = new Worker(
    process.cwd() + '/dist/workers/result.worker.js',
    {}
  );
  trotRaceStatusWorker.on('message', workerResponseHandler);
  trotRaceStatusWorker.on('error', workerErrorHandler);
};

export default trotRaceConnectionInitilizer;
