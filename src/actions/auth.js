// @flow
export const AUTH_SHOW_LOCK = 'AUTH_SHOW_LOCK';
export type ShowLock = { type: 'AUTH_SHOW_LOCK' };
export const showLock = (): ShowLock => ({
  type: AUTH_SHOW_LOCK,
});

export const AUTH_LOGIN_CALLBACK = 'AUTH_LOGIN_CALLBACK';
export type LoginCallback = { type: 'AUTH_LOGIN_CALLBACK', payload: Object };
export const loginCallback = (authResult: Object): LoginCallback => ({
  type: AUTH_LOGIN_CALLBACK,
  payload: authResult,
});

export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export type LoginSuccess = { type: 'AUTH_LOGIN_SUCCESS', payload: { token: Object, profile: Object } }; // prettier-ignore
export const loginSuccess = (token: Object, profile: Object): LoginSuccess => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: { token, profile },
});

export const AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED';
export type LoginFailed = { type: 'AUTH_LOGIN_FAILED', payload: Object };
export const loginFailed = (error: Object): LoginFailed => ({
  type: AUTH_LOGIN_FAILED,
  payload: error,
});

export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export type Logout = { type: 'AUTH_LOGOUT' };
export const logout = (): Logout => ({
  type: AUTH_LOGOUT,
});
