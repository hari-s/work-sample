import { AxiosError } from 'axios';
import { isMainThread, parentPort } from 'worker_threads';

import { getResults, postLogin } from '../services/index';
import { HttpStatus } from '../utils/types';

/**
 * Subscribes to race simulator
 * - Retries to get data if status is 204(No content)
 * - Reauthenticates if token expires
 * - Post messages on successful result
 * @param token - provide auth token
 */
export async function subscribeToResults(token: string) {
  try {
    const { status, data: raceEvent } = await getResults(token);

    if (status === HttpStatus.NO_CONTENT) {
      await subscribeToResults(token);
    }

    if (status === HttpStatus.OK) {
      if (!isMainThread) {
        parentPort?.postMessage(raceEvent);
      }
      await subscribeToResults(token);
    }
    throw new Error();
  } catch (err) {
    const status = (err as AxiosError).response?.status;
    if (status && status === HttpStatus.UNAUTHORIZED) {
      const {
        data: { token },
      } = await postLogin();
      await subscribeToResults(token);
    }
    throw err;
  }
}

(async () => {
  if (!isMainThread) {
    const {
      data: { token },
    } = await postLogin();
    subscribeToResults(token);
  }
})();
