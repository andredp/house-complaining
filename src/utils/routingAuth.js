import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { getAuth } from '../reducers';
import * as fromAuth from '../reducers/auth';

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: getAuth,
  predicate: fromAuth.getIsAuthenticated,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
});

/*
export const UserIsAdmin = UserAuthWrapper({
  authSelector: state => getAuth(state),
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsAdmin',
  predicate: user => user.isAdmin,
  allowRedirectBack: false,
});
*/

// FIXME: Keep on check if location.query is deprecated
const guestRedirectPath = (state, { location }) =>
  (location.query && location.query.redirect) || '/';

export const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: getAuth,
  predicate: auth => !fromAuth.getIsAuthenticated(auth),
  redirectAction: routerActions.replace,
  failureRedirectPath: guestRedirectPath,
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsNotAuthenticated',
});
