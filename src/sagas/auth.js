// @flow
// $FlowFixMe
import { put, apply, call, takeEvery, cps } from 'redux-saga/effects';
import createAuth0Lock from '../auth/createAuth0Lock';
import * as WebAPI from '../utils/WebAPI';
import * as localStorageHelper from '../utils/localStorageHelper';
import * as authActions from '../actions/auth';
import type { Action } from '../actions/types';
import type { LoginCallback } from '../actions/auth';

export function* showLock(lock: Object): Generator<*, *, *> {
  yield apply(lock, lock.show);
}

export function* loginCallback(lock: Object, action: LoginCallback): Generator<*, *, *> {
  const { idToken, accessToken } = action.payload;
  try {
    // NOTE: https://github.com/redux-saga/redux-saga/issues/39
    const profile = yield cps([lock, lock.getUserInfo], accessToken);
    yield call(localStorageHelper.setAuthToken, idToken);
    yield call(WebAPI.setAuthToken, idToken);
    yield put(authActions.loginSuccess(action.payload, profile));
    yield apply(lock, lock.hide); // Needed for popup mode
    // TODO: Where to redirect the user?
    // yield put(push('/'));
  } catch (error) {
    yield put(authActions.loginFailed(error));
    yield apply(lock, lock.hide);
    // TODO: Where to redirect the user?
    // yield put(push('/'));
  }
}

export function* logout(lock: Object): Generator<*, *, *> {
  yield call(localStorageHelper.removeAuthToken);
  yield call(WebAPI.removeAuthToken);
  yield apply(lock, lock.logout);
}

export default function createAuthSagas(dispatch: Action => void) {
  const auth0Lock: Object = createAuth0Lock(dispatch);
  return [
    takeEvery(authActions.AUTH_SHOW_LOCK, showLock, auth0Lock),
    takeEvery(authActions.AUTH_LOGIN_CALLBACK, loginCallback, auth0Lock),
    takeEvery(authActions.AUTH_LOGOUT, logout, auth0Lock),
  ];
}
