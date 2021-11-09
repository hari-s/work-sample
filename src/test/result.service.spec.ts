import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { GET_ROUTE_RESULTS } from '../config';
import { getResults } from '../services/result.service';

const MOCK_TOKEN = 'FAKE-TOKEN';

describe('ResultService', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  it('should pass authorization token while calling result service', () => {
    mock.onGet(GET_ROUTE_RESULTS).reply(200);
    getResults(MOCK_TOKEN);
    const httpHeader = mock.history.get[0].headers;
    const httpAuthorizationHeader = httpHeader?.Authorization;
    expect(httpAuthorizationHeader).toBe(`Bearer ${MOCK_TOKEN}`);
  });

  afterEach(() => {
    mock.restore();
  });
});
