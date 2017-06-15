// @flow
import type { ShowLock, LoginCallback, LoginSuccess, LoginFailed, Logout } from './auth';

// prettier-ignore
export type Action =
  // Auth Actions
  | ShowLock
  | LoginCallback
  | LoginSuccess
  | LoginFailed
  | Logout;
