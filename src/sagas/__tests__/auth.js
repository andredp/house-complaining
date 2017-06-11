import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import * as actions from '../../actions/auth';
import { authenticate, logout, validateToken } from '../auth';
import * as WebAPI from '../../utils/WebAPI';
import LocalStorageAPI from '../../utils/LocalStorageAPI';

const username = 'username';
const password = 'password';
const token = 'token';

test('validateToken saga: success', () => {
  const responseSuccess = { data: { access_token: token } };
  return expectSaga(validateToken, { action: 'AUTH_VALIDATE', payload: token })
    .provide([
      [matchers.call.fn(WebAPI.validateAuthToken), responseSuccess],
      [matchers.call.fn(WebAPI.getUsernameFromResponse), username],
    ])
    .put({ type: 'AUTH_VALIDATE_SUCCESS', payload: { token, username } })
    .dispatch(actions.validate(token))
    .silentRun();
});

test('validateToken saga: invalid token', () => {
  const responseError = { response: { data: {} } };
  return expectSaga(validateToken, { action: 'AUTH_VALIDATE', payload: token })
    .provide([
      [matchers.call.fn(WebAPI.validateAuthToken), throwError(responseError)],
      [matchers.call.fn(LocalStorageAPI.removeAuthToken)],
    ])
    .put.like({ action: { type: 'AUTH_VALIDATE_FAILED' } })
    .dispatch(actions.validate(token))
    .silentRun();
});

test('authenticate saga: success', () => {
  const responseSuccess = { data: { access_token: token } };
  return expectSaga(authenticate, {
    type: 'AUTH_LOGIN',
    payload: { username, password },
  })
    .provide([
      [matchers.call.fn(WebAPI.authenticate), responseSuccess],
      [matchers.call.fn(WebAPI.getAuthTokenFromResponse), token],
      [matchers.call.fn(LocalStorageAPI.setAuthToken)],
      [matchers.call.fn(WebAPI.setAuthToken)],
    ])
    .call(LocalStorageAPI.setAuthToken, token)
    .call(WebAPI.setAuthToken, token)
    .put({ type: 'AUTH_LOGIN_SUCCESS', payload: { token, username } })
    .dispatch(actions.authenticate(username, password))
    .silentRun();
});

test('authenticate saga: wrong password', () => {
  const action = { type: 'AUTH_LOGIN', payload: { username, password } };
  const errors = [{ error: 'error' }];
  const responseError = { response: { data: errors } };

  return expectSaga(authenticate, action)
    .provide([
      [matchers.call.fn(WebAPI.authenticate), throwError(responseError)],
      [matchers.call.fn(WebAPI.getAuthErrorsFromResponse), errors],
    ])
    .put({ type: 'AUTH_LOGIN_FAILED', payload: errors })
    .dispatch(actions.authenticate(username, password))
    .silentRun();
});

test('logout saga: success', () =>
  expectSaga(logout)
    .provide([
      [matchers.call.fn(LocalStorageAPI.removeAuthToken)],
      [matchers.call.fn(WebAPI.removeAuthToken)],
    ])
    .call(LocalStorageAPI.removeAuthToken)
    .call(WebAPI.removeAuthToken)
    .dispatch(actions.logout())
    .silentRun());
