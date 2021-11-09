import axios, { AxiosResponse } from 'axios';

import { GET_ROUTE_RESULTS } from '../config';
import { RaceEventResponse } from '../utils/types';

/**
 * Returns race event when horse starts or finishes race
 * @param token provide auth token
 * @returns {Promise<AxiosResponse<RaceEventResponse>>} race event object
 */
export const getResults = (
  token: string
): Promise<AxiosResponse<RaceEventResponse>> => {
  return axios.get(GET_ROUTE_RESULTS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getResults,
};
