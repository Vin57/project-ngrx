import { authErrorSelector } from 'src/app/shared/store/selector';
import { RootState } from '../../../shared/store/index';

describe('*** Auth selectors ***', () => {
  describe('ErrorAuthSelector', () => {
    it('-> It should return null', () => {
      const mockState: RootState = {
        router: null,
        authentication: {
          currentUser: null,
          jwtToken: null,
          error: null,
          loaded: false,
          loading: false,
        },
      };
      expect(authErrorSelector(mockState)).toEqual(null);
    });

    it('-> It should return error', () => {
      const mockState: RootState = {
        router: null,
        authentication: {
          currentUser: null,
          jwtToken: null,
          error: 'Fatal error',
          loaded: false,
          loading: false,
        },
      };
      expect(authErrorSelector(mockState)).toEqual('Fatal error');
    });
  });
});
