import { RaceEvent } from 'utils';

import { MOCK_EVENT } from './race-event.mock';

/**
 * Mock class implementation for tror race worker
 */
export class TrotRaceMockWorker {
  url;
  onconnect;
  constructor(stringUrl: string) {
    this.url = stringUrl;
    // eslint-disable-next-line
    this.onconnect = () => {};
  }

  on(event: string, cb: (race: RaceEvent) => void) {
    if (event === 'message') {
      cb(MOCK_EVENT);
    }
  }
}
