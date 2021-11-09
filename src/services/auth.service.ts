import axios, { AxiosError, AxiosResponse } from 'axios';

import { environment, POST_ROUTE_AUTH } from '../config';
import { HttpStatus, LoginResponse } from '../utils/types';

/**
 * Tries to login into the simulator
 * Authentication details taken from the environment
 * @returns {Promise<AxiosResponse<LoginResponse>>} axios response contains token
 */
export const postLogin = async (): Promise<AxiosResponse<LoginResponse>> => {
  try {
    const results = await axios.post<LoginResponse>(POST_ROUTE_AUTH, {
      email: environment.simulatorEmail,
      password: environment.simulatorPassword,
    });
    return results;
  } catch (err) {
    const status = (err as AxiosError).response?.status;
    if (status === HttpStatus.SERVICE_UNAVAILABLE) {
      return postLogin();
    }
    throw err;
  }
};

export default {
  postLogin,
};
