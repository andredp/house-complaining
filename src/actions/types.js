// @flow
import type { Error as AuthError } from '../reducers/auth';

// Auth actions
export type AuthLogin = { type: 'AUTH_LOGIN', payload: { username: string, password: string } }; // prettier-ignore
export type AuthLoginSuccess = { type: 'AUTH_LOGIN_SUCCESS', payload: { token: string, username: string } }; // prettier-ignore
export type AuthLoginFailed = { type: 'AUTH_LOGIN_FAILED', payload: Array<AuthError> }; // prettier-ignore
export type AuthValidate = { type: 'AUTH_VALIDATE', payload: string }; // prettier-ignore
export type AuthValidateSuccess = { type: 'AUTH_VALIDATE_SUCCESS', payload: { token: string, username: string } }; // prettier-ignore
export type AuthValidateFailed = { type: 'AUTH_VALIDATE_FAILED', payload: string }; // prettier-ignore
export type AuthLogout = { type: 'AUTH_LOGOUT' }; // prettier-ignore

// All actions
export type Action =
  // Auth actions
  | AuthLogin
  | AuthLoginSuccess
  | AuthLoginFailed
  | AuthValidate
  | AuthValidateSuccess
  | AuthValidateFailed
  | AuthLogout;
