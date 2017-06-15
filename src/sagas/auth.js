// @flow
import { put, apply, call, takeEvery, cps } from 'redux-saga/effects';
import createAuth0Lock from '../auth/Auth';
import * as WebAPI from '../utils/WebAPI';
import * as LocalStorageHelper from '../utils/LocalStorageHelper';

export function* loginRequest(lock: Object): Generator<*, *, *> {
  yield apply(lock, lock.show);
}

export function* loginCallback(lock: Object, action): Generator<*, *, *> {
  const { idToken, accessToken } = action.payload;
  try {
    // check: https://github.com/redux-saga/redux-saga/issues/39
    const profile = yield cps([lock, lock.getUserInfo], accessToken);
    yield call(LocalStorageHelper.setAuthToken, idToken);
    yield call(WebAPI.setAuthToken, idToken);
    yield put({ type: 'AUTH_LOGIN_SUCCESS', payload: { profile, idToken } });
    yield apply(lock, lock.hide); // Needed for popup mode
    // TODO: Where to redirect the user?
    // yield put(push('/'));
  } catch (error) {
    yield put({ type: 'AUTH_LOGIN_FAILED', payload: error });
    // TODO: Where to redirect the user?
    // yield put(push('/'));
  }
}

export function* logout(lock: Object): Generator<*, *, *> {
  yield call(LocalStorageHelper.removeAuthToken);
  yield call(WebAPI.removeAuthToken);
  yield apply(lock, lock.logout);
}

const auth0Lock = createAuth0Lock();

export default [
  takeEvery('AUTH_LOGIN_REQUEST', loginRequest, auth0Lock),
  takeEvery('AUTH_LOGIN_CALLBACK', loginCallback, auth0Lock),
  takeEvery('AUTH_LOGOUT', logout, auth0Lock),
];
