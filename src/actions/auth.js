// @flow
import type { Action } from './types';

export const loginRequest = (): Action => ({ type: 'AUTH_LOGIN_REQUEST' });
export const logout = (): Action => ({ type: 'AUTH_LOGOUT' });

export const authenticate = (username: string, password: string): Action => ({
  type: 'AUTH_LOGIN',
  payload: { username, password },
});

export const validate = (token: string): Action => ({
  type: 'AUTH_VALIDATE',
  payload: token,
});
