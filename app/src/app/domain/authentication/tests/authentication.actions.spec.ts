import * as AuthActions from '../store/authentication.actions';

describe('*** Auth actions ***', () => {
  describe('** TrySignupAction **', () => {
    it('-> It should create a TrySignup action', () => {
      const payload = {
        email: 'paul@dupond.fr',
        name: 'Paul',
        password: '123456',
      };
      const action = new AuthActions.AuthenticationSignup(payload);
      expect({ ...action }).toEqual({
        type: AuthActions.AuthenticationActionEnum.AUTHENTICATION_SIGNUP,
        payload,
      });
    });

    it('-> It should create a SingupError action', () => {
      const payload = {
        error: 'error',
      };
      const action = new AuthActions.AuthenticationSignupError(payload);
      expect({ ...action }).toEqual({
        type: AuthActions.AuthenticationActionEnum.AUTHENTICATION_SIGNUP_ERROR,
        payload,
      });
    });
  });
});
