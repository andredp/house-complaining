// @flow
import { combineReducers } from 'redux';
import type { Action } from '../actions/types';

export type Error = {
  +field: string,
  +message: string,
};

export type AuthState = {
  +username: string,
  +token: string,
  +errors: Array<Error>,
  +isAuthenticating: boolean,
};

const username = (state = '', action: Action): string => {
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

const token = (state = '', action: Action): string => {
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

const errors = (state = [], action: Action): Array<Error> => {
  switch (action.type) {
    case 'AUTH_LOGIN_FAILED':
      return action.payload;
    case 'AUTH_LOGIN':
      return [];
    default:
      return state;
  }
};

const isAuthenticating = (state = false, action: Action): boolean => {
  switch (action.type) {
    case 'AUTH_LOGIN':
    case 'AUTH_VALIDATE':
      return true;
    case 'AUTH_LOGIN_SUCCESS':
    case 'AUTH_LOGIN_FAILED':
    case 'AUTH_VALIDATE_SUCCESS':
    case 'AUTH_VALIDATE_FAILED':
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  username,
  token,
  errors,
  isAuthenticating,
});

// selectors
export const getUsername = (state: AuthState): string => state.username;
export const getToken = (state: AuthState): string => state.token;
export const getErrors = (state: AuthState): Array<Error> => state.errors;
export const getIsAuthenticated = (state: AuthState): boolean => state.token !== '';
export const getIsAuthenticating = (state: AuthState): boolean => state.isAuthenticating;
