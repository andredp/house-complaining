// @flow
import { getIsAuthenticating, getAuthToken, getUsername } from '../reducers';
import WebAPI from '../utils/WebAPI';
import type { ThunkAction } from './types';

export const authenticate = (username: string, password: string): ThunkAction => (
  dispatch,
  getState,
) => {
  if (getIsAuthenticating(getState())) {
    return Promise.resolve();
  }

  dispatch({ type: 'AUTHENTICATE_PENDING' });

  return WebAPI.authenticate(username, password).then(
    (response: Promise<*>) => {
      dispatch({
        type: 'AUTHENTICATE_FULFILLED',
        payload: { response, username },
      });
      // store the token on the localStorage
      localStorage.setItem('auth.token', getAuthToken(getState()));
      localStorage.setItem('auth.username', getUsername(getState()));
      WebAPI.setAuthenticationToken(getAuthToken(getState()));
    },
    (error: Promise<*>) => {
      dispatch({
        type: 'AUTHENTICATE_REJECTED',
        payload: error,
      });
    },
  );
};

export const logout = () => {
  localStorage.removeItem('auth.token');
  localStorage.removeItem('auth.username');
  WebAPI.setAuthenticationToken('');
  return {
    type: 'LOGOUT',
  };
};
