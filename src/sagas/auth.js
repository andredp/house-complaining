// @flow
/* eslint-disable no-constant-condition */
import { put, call, take } from 'redux-saga/effects';
import type { $AxiosXHR } from 'axios';
import * as WebAPI from '../utils/WebAPI';
import LocalStorageAPI from '../utils/LocalStorageAPI';
import type { AuthLogin, AuthValidate } from '../actions/types';
import type { Error as AuthError } from '../reducers/auth';

export function* validateToken(): Generator<*, *, *> {
  while (true) {
    try {
      const action: AuthValidate = yield take('AUTH_VALIDATE');
      const token = action.payload;
      const response = yield call(WebAPI.validateAuthToken, token);
      const username = yield call(WebAPI.getUsernameFromResponse, response);
      yield put({
        type: 'AUTH_VALIDATE_SUCCESS',
        payload: { token, username },
      });
    } catch (error) {
      yield call(LocalStorageAPI.removeAuthToken);
      yield put({
        type: 'AUTH_VALIDATE_FAILED',
        payload: 'Token is no longer valid',
      });
    }
  }
}

export function* authenticate(): Generator<*, *, *> {
  while (true) {
    try {
      const action: AuthLogin = yield take('AUTH_LOGIN');
      const { username, password } = action.payload;
      const response: $AxiosXHR<*> = yield call(WebAPI.authenticate, username, password);
      const token: string = yield call(WebAPI.getAuthTokenFromResponse, response);
      yield call(LocalStorageAPI.setAuthToken, token);
      yield call(WebAPI.setAuthToken, token);
      yield put({ type: 'AUTH_LOGIN_SUCCESS', payload: { token, username } });
    } catch (error) {
      const errors: AuthError = yield call(WebAPI.getAuthErrorsFromResponse, error);
      yield put({ type: 'AUTH_LOGIN_FAILED', payload: errors });
    }
  }
}

export function* logout(): Generator<*, *, *> {
  while (true) {
    yield take('AUTH_LOGOUT');
    yield call(LocalStorageAPI.removeAuthToken);
    yield call(WebAPI.removeAuthToken);
  }
}
