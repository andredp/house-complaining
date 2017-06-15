import authReducer from '../auth';
import * as authActions from '../../actions/auth';

describe('auth reducer', () => {
  const authState = {
    token: { c: 'c' },
    profile: { d: 'd' },
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      profile: {},
      token: {},
    });
  });

  it('should handle AUTH_LOGIN_SUCCESS', () => {
    expect(authReducer(authState, authActions.loginSuccess({ a: 'a' }, { b: 'b' }))).toEqual({
      token: { a: 'a' },
      profile: { b: 'b' },
    });
  });

  it('should handle AUTH_LOGIN_FAILED', () => {
    expect(authReducer(authState, authActions.loginFailed())).toEqual({
      profile: {},
      token: {},
    });
  });

  it('should handle something else by returning the same state', () => {
    expect(authReducer(authState, { action: expect.anything() })).toEqual(authState);
  });
});

/*
describe('auth.username reducer tests', () => {
  it('should return the initial state', () => {
    expect(fromAuth.username(undefined, {})).toBe('');
  });

  it('should handle: AUTH_LOGIN_SUCCESS', () => {
    expect(
      fromAuth.username(expect.anything(), {
        type: 'AUTH_LOGIN_SUCCESS',
        payload: { username: 'some name' },
      }),
    ).toBe('some name');
  });

  it('should handle: AUTH_VALIDATE_SUCCESS', () => {
    expect(
      fromAuth.username(expect.anything(), {
        type: 'AUTH_VALIDATE_SUCCESS',
        payload: { username: 'some name' },
      }),
    ).toBe('some name');
  });

  it('should handle: AUTH_VALIDATE_FAILED', () => {
    expect(
      fromAuth.username(expect.anything(), {
        type: 'AUTH_VALIDATE_FAILED',
      }),
    ).toBe('');
  });

  it('should handle: AUTH_LOGOUT', () => {
    expect(
      fromAuth.username(expect.anything(), {
        type: 'AUTH_LOGOUT',
      }),
    ).toBe('');
  });
});

describe('auth.token reducer tests', () => {
  it('should return the initial state', () => {
    expect(fromAuth.token(undefined, {})).toBe('');
  });

  it('should handle: AUTH_LOGIN_SUCCESS', () => {
    expect(
      fromAuth.token(expect.anything(), {
        type: 'AUTH_LOGIN_SUCCESS',
        payload: { token: 'some token' },
      }),
    ).toBe('some token');
  });

  it('should handle: AUTH_VALIDATE_SUCCESS', () => {
    expect(
      fromAuth.token(expect.anything(), {
        type: 'AUTH_VALIDATE_SUCCESS',
        payload: { token: 'some token' },
      }),
    ).toBe('some token');
  });

  it('should handle: AUTH_VALIDATE_FAILED', () => {
    expect(
      fromAuth.token(expect.anything(), {
        type: 'AUTH_VALIDATE_FAILED',
      }),
    ).toBe('');
  });

  it('should handle: AUTH_LOGOUT', () => {
    expect(
      fromAuth.token(expect.anything(), {
        type: 'AUTH_LOGOUT',
      }),
    ).toBe('');
  });
});

describe('auth combined reducers tests', () => {
  const initialState = {
    username: '',
    token: '',
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });
});

describe('auth selector tests', () => {
  const state = {
    username: 'username',
    token: 'token',
  };

  it('should return the username', () => {
    expect(fromAuth.getUsername(state)).toEqual(state.username);
  });

  it('should return the token', () => {
    expect(fromAuth.getToken(state)).toEqual(state.token);
  });

  it('should return the true if the user is authenticated: true', () => {
    expect(fromAuth.getIsAuthenticated(state)).toEqual(true);
  });

  const newState = { ...state, token: '' };
  it('should return the true if the user is authenticated: false', () => {
    expect(fromAuth.getIsAuthenticated(newState)).toEqual(false);
  });
});
*/
