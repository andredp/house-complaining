// @flow
// $FlowFixMe
import { put, call } from 'redux-saga/effects';
import type { $AxiosXHR } from 'axios';
import * as WebAPI from '../utils/WebAPI';
import LocalStorageAPI from '../utils/LocalStorageAPI';
import type { AuthLogin, AuthValidate } from '../actions/types';

export function* validateToken(action: AuthValidate): Generator<*, *, *> {
  try {
    const token = action.payload;
    const response = yield call(WebAPI.validateAuthToken, token);
    const username = yield call(WebAPI.getUsernameFromResponse, response);
    yield put({ type: 'AUTH_VALIDATE_SUCCESS', payload: { token, username } });
  } catch (error) {
    yield call(LocalStorageAPI.removeAuthToken);
    yield put({ type: 'AUTH_VALIDATE_FAILED', payload: 'Invalid token.' });
  }
}

export function* authenticate(action: AuthLogin): Generator<*, *, *> {
  try {
    const { username, password } = action.payload;
    const response: $AxiosXHR<*> = yield call(WebAPI.authenticate, username, password);
    const token: string = yield call(WebAPI.getAuthTokenFromResponse, response);
    yield call(LocalStorageAPI.setAuthToken, token);
    yield call(WebAPI.setAuthToken, token);
    yield put({ type: 'AUTH_LOGIN_SUCCESS', payload: { token, username } });
  } catch (error) {
    const errors: Object = yield call(WebAPI.getAuthErrorsFromResponse, error);
    yield put({ type: 'AUTH_LOGIN_FAILED', payload: errors });
  }
}

export function* logout(): Generator<*, *, *> {
  yield call(LocalStorageAPI.removeAuthToken);
  yield call(WebAPI.removeAuthToken);
}
