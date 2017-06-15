import Auth0Lock from 'auth0-lock';
import store from '../store/configure-store';
import logo from './logo.svg';
import lockImg from './lock.svg';

const lockOptions = {
  auth: {
    // HACK: Potential bug:
    // https://auth0.com/forum/t/popup-login-window-is-not-closed-after-authentication/2843
    redirect: false,
  },
  language: 'es',
  languageDictionary: { title: 'House Complaining' },
  allowSignup: JSON.parse(process.env.REACT_APP_AUTH0_ALLOW_SIGNUP),
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

export default function createAuth0Lock() {
  const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const lock = new Auth0Lock(clientID, domain, lockOptions);

  lock.on('authenticated', (authResult) => {
    store.dispatch({ type: 'AUTH_LOGIN_CALLBACK', payload: authResult });
  });

  lock.on('unrecoverable_error', (error) => {
    store.dispatch({ type: 'AUTH_LOGIN_FAILED', payload: error });
    lock.hide();
  });

  lock.on('authorization_error', (error) => {
    lock.show({
      flashMessage: {
        type: 'error',
        text: error.error_description,
      },
    });
  });

  lock.on('hide', () => {});

  return lock;
}
