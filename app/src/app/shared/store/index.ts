import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import {
  AuthenticationReducer,
  AuthenticationState,
} from 'src/app/domain/authentication/store/authentication.reducers';
import { RouterState } from './models/router-state.model';

export interface RootState {
  router: RouterReducerState<RouterState>;
  authentication: AuthenticationState;
}

export const reducers: ActionReducerMap<RootState> = {
  router: routerReducer,
  authentication: AuthenticationReducer,
};
