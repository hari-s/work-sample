import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { POST_ROUTE_AUTH } from '../config';
import auth from '../services/auth.service';
import { HttpStatus } from '../utils';

describe('AuthService', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  it('should try to login again if network is unavailable', async () => {
    let calls = 0;
    let fakeUnavailability = true;
    mock.onPost(POST_ROUTE_AUTH).reply(function () {
      calls++;
      if (fakeUnavailability) {
        fakeUnavailability = false;
        return [HttpStatus.SERVICE_UNAVAILABLE];
      }
      return [HttpStatus.OK];
    });
    await auth.postLogin();
    expect(calls).toBe(2);
  });

  it('should not try to login again if error', async () => {
    let calls = 0;
    mock.onPost(POST_ROUTE_AUTH).reply(function () {
      calls++;
      return [HttpStatus.INTERNAL_SERVER_ERROR];
    });
    try {
      await auth.postLogin();
    } catch {
      expect(calls).toBe(1);
    }
  });

  afterEach(() => {
    mock.restore();
  });
});
