// @flow
import { combineReducers } from 'redux';
import type { Action } from '../actions/types';

export type AuthState = {
  +profile: string,
  +token: string,
};

export const profile = (state: string = '', action: Action): string => {
  switch (action.type) {
    case 'AUTH_LOGIN_SUCCESS':
    case 'AUTH_VALIDATE_SUCCESS':
      return action.payload.profile;
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
  profile,
  token,
});

// selectors
export const getProfile = (state: AuthState): Object => state.profile;
export const getToken = (state: AuthState): Object => state.token;
export const getIsAuthenticated = (state: AuthState): boolean => state.token !== {};
