import { JwtToken } from '../models/class/jwt-token.model';
import { JWTTokenFactory } from '../models/factories/jwt-token.factory';
import { JWT_LOCALE_KEY } from '../services/auth.service';
import {
  AuthenticationActionEnum,
  AuthenticationActions,
} from './authentication.actions';

export interface AuthenticationState {
  datas: JwtToken;
  loaded: boolean;
  loading: boolean;
  error: any;
}

const initialState: AuthenticationState = {
  datas: null,
  loaded: false,
  loading: false,
  error: null,
};

export function AuthenticationReducer(
  state: AuthenticationState = initialState,
  action: AuthenticationActions
) {
  switch (action.type) {
    case AuthenticationActionEnum.AUTHENTICATION_SIGNIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case AuthenticationActionEnum.AUTHENTICATION_SIGNIN_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        datas: JWTTokenFactory.build(action.payload),
        error: null,
      };
    }
    case AuthenticationActionEnum.AUTHENTICATION_SIGNIN_ERROR: {
      return {
        ...state,
        loaded: false,
        loading: false,
        datas: JWTTokenFactory.build(),
        error: action.payload,
      };
    }
    case AuthenticationActionEnum.AUTHENTICATION_SIGNUP: {
      return {
        ...state,
        loading: true,
      };
    }
    case AuthenticationActionEnum.AUTHENTICATION_SIGNUP_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        datas: JWTTokenFactory.build(action.payload),
        error: null,
      };
    }
    case AuthenticationActionEnum.AUTHENTICATION_SIGNUP_ERROR: {
      return {
        ...state,
        loaded: false,
        loading: false,
        datas: JWTTokenFactory.build(),
        error: action.payload,
      };
    }
    case AuthenticationActionEnum.AUTHENTICATION_LOGOUT_ACTION: {
      return {
        ...state,
        loaded: true,
        loading: false,
        datas: JWTTokenFactory.build(),
        error: null,
      };
    }
  }
}
