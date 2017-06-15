// @flow
import { combineReducers } from 'redux';
import type { Action } from '../actions/types';
import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILED } from '../actions/auth';

export const profile = (state?: Object = {}, action: Action): Object => {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return action.payload.profile;
    case AUTH_LOGIN_FAILED:
      return {};
    default:
      return state;
  }
};

export const token = (state?: Object = {}, action: Action): Object => {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return action.payload.token;
    case AUTH_LOGIN_FAILED:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  profile,
  token,
});

export type AuthState = {
  +profile: Object,
  +token: Object,
};

// selectors
export const getProfile = (state: AuthState): Object => state.profile;
export const getToken = (state: AuthState): Object => state.token;
export const getIdToken = (state: AuthState): string => state.token.idToken;
export const getIsAuthenticated = (state: AuthState): boolean => state.token !== {};
