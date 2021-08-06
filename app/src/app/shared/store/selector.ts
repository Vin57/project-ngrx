import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from 'src/app/domain/authentication/store/authentication.reducers';
import { STORE_ENTRY_AUTHENTICATION, STORE_ENTRY_ROUTER } from './entries';
import { RouterState } from './models/router-state.model';

// Router parent
export const routerSelector =
  createFeatureSelector<RouterReducerState<RouterState>>(STORE_ENTRY_ROUTER);
// Router childs
export const routerStateSelector = createSelector(
  routerSelector,
  (routerState: RouterReducerState<RouterState>) => routerState.state
);

// Authentication parent
export const authSelector = createFeatureSelector<AuthenticationState>(
  STORE_ENTRY_AUTHENTICATION
);

export const authTokenSelector = createSelector(
  authSelector,
  (authState: AuthenticationState) => authState.datas
);
