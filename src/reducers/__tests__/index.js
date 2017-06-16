import * as selectors from '../';

describe('auth selector', () => {
  const state = {
    auth: {
      profile: { name: 'name' },
      token: { idToken: 'idToken' },
    },
  };

  it('should return the auth slice', () => {
    expect(selectors.getAuth(state)).toEqual(state.auth);
  });

  it('should return the profile', () => {
    expect(selectors.getAuthProfile(state)).toEqual(state.auth.profile);
  });

  it('should return the token', () => {
    expect(selectors.getAuthToken(state)).toEqual(state.auth.token);
  });

  it('should return the token', () => {
    expect(selectors.getAuthIdToken(state)).toEqual(state.auth.token.idToken);
  });

  it('should return the true if the user is authenticated: true', () => {
    expect(selectors.getIsAuthenticated(state)).toEqual(true);
  });

  it('should return the true if the user is authenticated: false', () => {
    const newState = {
      ...state,
      auth: {
        token: {},
      },
    };
    expect(selectors.getIsAuthenticated(newState)).toEqual(false);
  });
});
