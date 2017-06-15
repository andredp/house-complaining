import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import createAuth0Lock from '../../auth/Auth';
import { showLock, loginCallback, logout } from '../auth';
import * as localStorageHelper from '../../utils/localStorageHelper';
import * as WebAPI from '../../utils/WebAPI';

describe('showLock saga', () => {
  const lock = createAuth0Lock();
  it('should show the lock', () =>
    expectSaga(showLock, lock)
      .provide([[matchers.apply.fn(lock, lock.show)]])
      .apply(lock, lock.show)
      .run());
});

describe('logincallback saga', () => {
  const lock = createAuth0Lock();
  const idToken = 'idToken';
  const accessToken = 'accessToken';

  it('should successfuly handle AUTH_LOGIN_CALLBACK', () => {
    const profile = { name: 'name' };
    return expectSaga(loginCallback, lock, { payload: { idToken, accessToken } })
      .provide([
        [matchers.cps.fn(lock.getUserInfo), profile],
        [matchers.call.fn(localStorageHelper.setAuthToken)],
        [matchers.call.fn(WebAPI.setAuthToken)],
        [matchers.apply.fn(lock, lock.hide)],
      ])
      .cps([lock, lock.getUserInfo], accessToken)
      .call(localStorageHelper.setAuthToken, idToken)
      .call(WebAPI.setAuthToken, idToken)
      .put({ type: 'AUTH_LOGIN_SUCCESS', payload: { profile, idToken } })
      .apply(lock, lock.hide)
      .run();
  });

  it('should handle an error on getUserInfo', () => {
    const error = { error: 'error' };
    return expectSaga(loginCallback, lock, { payload: { idToken, accessToken } })
      .provide([
        [matchers.cps.fn(lock.getUserInfo), throwError(error)],
        [matchers.apply.fn(lock, lock.hide)],
      ])
      .cps([lock, lock.getUserInfo], accessToken)
      .put({ type: 'AUTH_LOGIN_FAILED', payload: error })
      .apply(lock, lock.hide)
      .run();
  });
});

describe('logout saga', () => {
  const lock = createAuth0Lock();
  it('should cleanup and logout', () =>
    expectSaga(logout, lock)
      .provide([
        [matchers.call.fn(localStorageHelper.removeAuthToken)],
        [matchers.call.fn(WebAPI.removeAuthToken)],
        [matchers.apply.fn(lock, lock.logout)],
      ])
      .call(localStorageHelper.removeAuthToken)
      .call(WebAPI.removeAuthToken)
      .apply(lock, lock.logout)
      .run());
});
