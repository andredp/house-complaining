// @flow
import axios from 'axios';
import type { $AxiosError, $AxiosXHR } from 'axios';
import type { Error as AuthError } from '../reducers/auth';

export function setAuthToken(token: string) {
  axios.defaults.headers.common.Authorization = token;
}

export const getAuthTokenFromResponse = (response: $AxiosXHR<*>): string =>
  response.data.access_token;

export const getUsernameFromResponse = (response: $AxiosXHR<*>): string => response.data.username;

export function getAuthErrorsFromResponse(error: $AxiosError<Array<AuthError>>): Array<AuthError> {
  if (typeof error.response === 'undefined') {
    return [{ field: 'password', message: error.message || 'Unknown Error.' }];
  }
  return error.response.data;
}

export function removeAuthToken() {
  axios.defaults.headers.common.Authorization = '';
}

export const authenticate = (username: string, password: string): $AxiosXHR<*> =>
  axios.post(
    '/api/login',
    { username, password },
    {
      headers: { Accept: 'application/json' },
    },
  );

export const validateAuthToken = (token: string): $AxiosXHR<*> =>
  axios.post(
    '/api/validate-token',
    { access_token: token },
    {
      headers: { Accept: 'application/json' },
    },
  );
