// @flow
/* eslint-disable no-use-before-define */
import axios from 'axios';

type Response = typeof authenticate | typeof validateAuthToken;
type ErrorResponse = { response?: Response, message: string };

export const authenticate = (username: string, password: string) =>
  axios.post('/api/login', { username, password }, { headers: { Accept: 'application/json' } });

export const validateAuthToken = (token: string) =>
  axios.post(
    '/api/validate-token',
    { access_token: token },
    { headers: { Accept: 'application/json' } },
  );

export function setAuthToken(token: string) {
  axios.defaults.headers.common.Authorization = token;
}

export const getAuthTokenFromResponse = (response: Response): string => response.data.access_token;

export const getUsernameFromResponse = (response: Response): string => response.data.username;

export const getErrorFromResponse = (error: ErrorResponse): string => {
  if (typeof error.response === 'undefined') {
    return error.message;
  }
  return error.response.data;
};

export function getAuthErrorsFromResponse(error: ErrorResponse) {
  if (typeof error.response === 'undefined') {
    return { password: error.message || 'Unknown Error.' };
  }
  // [{}, {}] -> {}
  return error.response.data.reduce(
    (acc, { field, message }) => ({ ...acc, [field]: message }),
    {},
  );
}

export function removeAuthToken() {
  axios.defaults.headers.common.Authorization = '';
}
