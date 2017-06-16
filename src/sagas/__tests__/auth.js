import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import createAuth0Lock from '../../auth/createAuth0Lock';
import * as authActions from '../../actions/auth';
import { showLock, loginCallback, logout } from '../auth';
import * as localStorageHelper from '../../utils/localStorageHelper';
import * as WebAPI from '../../utils/WebAPI';

const lock = createAuth0Lock();

describe('showLock saga', () => {
  it('should show the lock', () =>
    expectSaga(showLock, lock)
      .provide([[matchers.apply.fn(lock, lock.show)]])
      .apply(lock, lock.show)
      .run());
});

describe('logincallback saga', () => {
  const token = { idToken: 'a', accessToken: 'b' };

  it('should successfuly handle AUTH_LOGIN_CALLBACK', () => {
    const profile = { name: 'name' };
    return expectSaga(loginCallback, lock, { payload: token })
      .provide([
        [matchers.cps.fn(lock.getUserInfo), profile],
        [matchers.call.fn(localStorageHelper.setAuthToken)],
        [matchers.call.fn(WebAPI.setAuthToken)],
        [matchers.apply.fn(lock, lock.hide)],
      ])
      .cps([lock, lock.getUserInfo], token.accessToken)
      .call(localStorageHelper.setAuthToken, token.idToken)
      .call(WebAPI.setAuthToken, token.idToken)
      .put(authActions.loginSuccess(token, profile))
      .apply(lock, lock.hide)
      .run();
  });

  it('should handle an error on getUserInfo', () => {
    const error = { error: 'error' };
    return expectSaga(loginCallback, lock, { payload: token })
      .provide([
        [matchers.cps.fn(lock.getUserInfo), throwError(error)],
        [matchers.apply.fn(lock, lock.hide)],
      ])
      .cps([lock, lock.getUserInfo], token.accessToken)
      .put(authActions.loginFailed(error))
      .apply(lock, lock.hide)
      .run();
  });
});

describe('logout saga', () => {
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
