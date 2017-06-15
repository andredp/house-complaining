import React from 'react';
import { connect } from 'react-redux';
import Auth0Lock from 'auth0-js';

class Auth extends React.Component {
  // FIXME: Put this on global vars
  lock = new Auth0Lock('wdGMb7e5fXmG46FpLFWrGT1eP3a4pmOf', 'andredp.eu.auth0.com', {
    auth: { redirect: false },
    languageDictionary: { title: 'Starter Pack' },
  });

  componentWillMount() {
    this.lock.on('authenticated', (authResult: auth0.Auth0DecodedHash) => {
      lock.getUserInfo(
        authResult.accessToken,
        (error: auth0.Auth0Error, profile: auth0.Auth0UserProfile) => {
          if (!error) {
            lock.hide();
            resolve({ profile, idToken: authResult.idToken });
          }
        },
      );
    });
  }

  render() {
    return { ...this.props.children };
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect()(Auth);
