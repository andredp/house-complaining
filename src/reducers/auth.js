// @flow
import { combineReducers } from 'redux';
import type { Action } from '../actions/types';

export type AuthState = {
  +username: string,
  +token: string,
};

export const username = (state: string = '', action: Action): string => {
  switch (action.type) {
    case 'AUTH_LOGIN_SUCCESS':
    case 'AUTH_VALIDATE_SUCCESS':
      return action.payload.username;
    case 'AUTH_VALIDATE_FAILED':
    case 'AUTH_LOGOUT':
      return '';
    default:
      return state;
  }
};

export const token = (state: string = '', action: Action): string => {
  switch (action.type) {
    case 'AUTH_LOGIN_SUCCESS':
    case 'AUTH_VALIDATE_SUCCESS':
      return action.payload.token;
    case 'AUTH_VALIDATE_FAILED':
    case 'AUTH_LOGOUT':
      return '';
    default:
      return state;
  }
};

export default combineReducers({
  username,
  token,
});

// selectors
export const getUsername = (state: AuthState): string => state.username;
export const getToken = (state: AuthState): string => state.token;
export const getIsAuthenticated = (state: AuthState): boolean => state.token !== '';
