// @flow
import { combineReducers } from 'redux';
import type { Action } from '../actions/types';

type Error = {
  field: string,
  message: string,
};

export type AuthState = {
  +username: string,
  +token: string,
  +errors: Array<Error>,
  +isAuthenticating: boolean,
};

// TODO: check validation with server
const usernameInitialState = localStorage.getItem('auth.username') || '';
const username = (state = usernameInitialState, action: Action): string => {
  switch (action.type) {
    case 'AUTHENTICATE_FULFILLED':
      return action.payload.username;
    case 'LOGOUT':
      return '';
    default:
      return state;
  }
};

// TODO: check validation with server
const tokenInitialState = localStorage.getItem('auth.token') || '';
const token = (state = tokenInitialState, action: Action): string => {
  switch (action.type) {
    case 'AUTHENTICATE_FULFILLED':
      return action.payload.response.data.access_token;
    case 'LOGOUT':
      return '';
    default:
      return state;
  }
};

const errors = (state = [], action: Action): Array<Error> => {
  switch (action.type) {
    case 'AUTHENTICATE_REJECTED':
      // TODO: Maybe make it a global error?
      if (typeof action.payload.response === 'undefined') {
        return [{ field: 'password', message: action.payload.message }];
      }
      return action.payload.response.data;
    case 'AUTHENTICATE_PENDING':
    case 'AUTHENTICATE_FULFILLED':
      return [];
    default:
      return state;
  }
};

const isAuthenticating = (state = false, action: Action): boolean => {
  switch (action.type) {
    case 'AUTHENTICATE_PENDING':
      return true;
    case 'AUTHENTICATE_FULFILLED':
    case 'AUTHENTICATE_REJECTED':
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
