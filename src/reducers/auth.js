// @flow
import { combineReducers } from 'redux';
import type { Action } from '../actions/types';

export type AuthState = {
  +profile: string,
  +idToken: string,
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

export const idToken = (state: string = '', action: Action): string => {
  switch (action.type) {
    case 'AUTH_LOGIN_SUCCESS':
    case 'AUTH_VALIDATE_SUCCESS':
      return action.payload.idToken;
    case 'AUTH_VALIDATE_FAILED':
    case 'AUTH_LOGOUT':
      return '';
    default:
      return state;
  }
};

export default combineReducers({
  profile,
  idToken,
});

// selectors
export const getProfile = (state: AuthState): string => state.profile;
export const getToken = (state: AuthState): string => state.idToken;
export const getIsAuthenticated = (state: AuthState): boolean => state.idToken !== '';
