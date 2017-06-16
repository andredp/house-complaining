// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import auth, * as fromAuth from './auth';
import type { AuthState } from './auth';

export default combineReducers({
  auth,
  routing,
  form,
});

type State = {
  +auth: AuthState,
  +routing: Object,
  +form: Object,
};

// auth selectors
export const getAuth = (state: State): AuthState => state.auth;
export const getAuthProfile = (state: State): Object => fromAuth.getProfile(state.auth);
export const getAuthToken = (state: State): Object => fromAuth.getToken(state.auth);
export const getAuthIdToken = (state: State): string => fromAuth.getIdToken(state.auth);
export const getIsAuthenticated = (state: State): boolean =>
  fromAuth.getIsAuthenticated(state.auth);
