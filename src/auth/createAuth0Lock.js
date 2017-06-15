// @flow
import Auth0Lock from 'auth0-lock';
import * as authActions from '../actions/auth';
import logo from './logo.svg';
import lockImg from './lock.svg';
import type { Action } from '../actions/types';

const lockOptions = {
  auth: {
    // HACK: Potential bug:
    // https://auth0.com/forum/t/popup-login-window-is-not-closed-after-authentication/2843
    redirect: false,
  },
  language: 'en',
  languageDictionary: { title: 'House Complaining' },
  allowSignup: process.env.REACT_APP_AUTH0_ALLOW_SIGNUP === 'true',
  theme: {
    logo,
    primaryColor: '#333',
  },
  additionalSignUpFields: [
    {
      name: 'code',
      placeholder: 'Enter the secret code here...',
      icon: lockImg,
      validator: code => ({
        valid: code === process.env.REACT_APP_AUTH0_SIGNUP_CODE,
        hint: 'This should be provided by André',
      }),
    },
  ],
};

export default function createAuth0Lock(dispatch: Action => void) {
  const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const lock = new Auth0Lock(clientID, domain, lockOptions);

  // callbacks
  lock.on('authenticated', (authResult: Object) => {
    dispatch(authActions.loginCallback(authResult));
  });

  lock.on('unrecoverable_error', () => {
    throw new Error('Unimplemented.');
  });

  lock.on('authorization_error', () => {
    throw new Error('Unimplemented.');
    // TODO: move inside the saga
    /* lock.show({
      flashMessage: {
        type: 'error',
        text: error.error_description,
      },
    });*/
  });

  lock.on('hide', () => {});

  lock.on('show', () => {});

  return lock;
}
