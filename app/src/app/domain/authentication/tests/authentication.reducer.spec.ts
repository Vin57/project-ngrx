import * as AuthReducer from '../store/authentication.reducers';
import * as AuthActions from '../store/authentication.actions';

describe('*** Auth reducer ***', () => {
  it('-> It should return initial state', () => {
    const { initialState } = AuthReducer;
    const action = {} as any;
    expect(AuthReducer.AuthenticationReducer(undefined, action)).toEqual(
      initialState
    );
  });

  it('-> State should have an error when SignupErrorAction', () => {
    const { initialState } = AuthReducer;
    const SignupErrorAction = new AuthActions.AuthenticationSignupError(
      'Erreur'
    );
    const state = AuthReducer.AuthenticationReducer(
      initialState,
      SignupErrorAction
    );
    expect(state.error).toEqual('Erreur');
  });
});
