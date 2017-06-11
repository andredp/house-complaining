// @flow
import type { Action } from './types';

export const authenticate = (username: string, password: string): Action => ({
  type: 'AUTH_LOGIN',
  payload: { username, password },
});

export const validate = (token: string): Action => ({
  type: 'AUTH_VALIDATE',
  payload: token,
});

export const logout = (): Action => ({
  type: 'AUTH_LOGOUT',
});
