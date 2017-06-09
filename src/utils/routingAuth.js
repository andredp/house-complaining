import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { getAuth } from '../reducers';
import * as fromAuth from '../reducers/auth';
import Loading from '../components/login-loading';

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => getAuth(state),
  authenticatingSelector: auth => fromAuth.getIsAuthenticating(auth),
  predicate: auth => fromAuth.getIsAuthenticated(auth),
  LoadingComponent: Loading,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export const UserIsAdmin = UserAuthWrapper({
  authSelector: state => getAuth(state),
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsAdmin',
  predicate: user => user.isAdmin,
  allowRedirectBack: false,
});

export const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => getAuth(state),
  predicate: auth => !fromAuth.getIsAuthenticated(auth), // && !fromAuth.getIsAuthenticating(auth),
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/',
  allowRedirectBack: false,
});
