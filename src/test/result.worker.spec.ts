import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { GET_ROUTE_RESULTS, POST_ROUTE_AUTH } from '../config';
import { HttpStatus } from '../utils';
import * as results from './result.worker';

describe('ResultWorker', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  it('should subscribe again while result is 200', async () => {
    let count = 0;
    mock.onGet(GET_ROUTE_RESULTS).reply(() => {
      if (count === 5) {
        throw new Error('Mock Error');
      }
      count++;
      return [HttpStatus.OK];
    });
    try {
      await results.subscribeToResults('MOCK-TOKEN');
    } catch (err) {
      expect(count).toBe(5);
    }
  });

  it('should subscribe again while status 204', async () => {
    let count = 0;
    mock.onGet(GET_ROUTE_RESULTS).reply(() => {
      if (count === 3) {
        throw new Error('MOCK-ERROR');
      }
      count++;
      return [HttpStatus.NO_CONTENT];
    });
    try {
      await results.subscribeToResults('MOCK-TOKEN');
    } catch (err) {
      expect(count).toBe(3);
    }
  });

  it('should only call resuls once while error', async () => {
    let count = 0;
    mock.onGet(GET_ROUTE_RESULTS).reply(() => {
      count++;
      return [HttpStatus.INTERNAL_SERVER_ERROR];
    });
    try {
      await results.subscribeToResults('MOCK-TOKEN');
    } catch (err) {
      expect(count).toBe(1);
      expect((err as AxiosError).response?.status).toBe(
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  });

  it('should try login while status is 401', async () => {
    let count = 0;
    let loginTried = false;

    mock.onPost(POST_ROUTE_AUTH).reply(() => {
      loginTried = true;
      return [HttpStatus.OK];
    });

    mock.onGet(GET_ROUTE_RESULTS).reply(() => {
      if (count === 0) {
        return [HttpStatus.UNAUTHORIZED];
      }
      if (count === 3) {
        throw new Error('MOCK-ERROR');
      }
      count++;
      return [HttpStatus.OK];
    });
    try {
      await results.subscribeToResults('MOCK-TOKEN');
    } catch (err) {
      expect(loginTried).toBe(true);
    }
  });

  afterEach(() => {
    mock.restore();
  });
});
