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
