// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth, * as fromAuth from './auth';
import type { AuthState } from './auth';

export default combineReducers({
  auth,
  routing: routerReducer,
});

type State = {
  +auth: AuthState,
  +routing: any,
};

// auth selectors
export const getAuth = (state: State): AuthState => state.auth;
export const getUsername = (state: State): string => fromAuth.getUsername(state.auth);
export const getAuthToken = (state: State): string => fromAuth.getToken(state.auth);
export const getAuthErrors = (state: State): Array<any> => fromAuth.getErrors(state.auth);
export const getIsAuthenticated = (state: State): boolean =>
  fromAuth.getIsAuthenticated(state.auth);
export const getIsAuthenticating = (state: State): boolean =>
  fromAuth.getIsAuthenticating(state.auth);
