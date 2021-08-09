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
      state = {
        ...state,
        loading: true,
      };
      break;
    }
    case AuthenticationActionEnum.AUTHENTICATION_SIGNIN_SUCCESS: {
      state = {
        ...state,
        loaded: true,
        loading: false,
        datas: JWTTokenFactory.build(action.payload),
        error: null,
      };
      break;
    }
    case AuthenticationActionEnum.AUTHENTICATION_SIGNIN_ERROR: {
      state = {
        ...state,
        loaded: false,
        loading: false,
        datas: JWTTokenFactory.build(),
        error: action.payload,
      };
      break;
    }
    case AuthenticationActionEnum.AUTHENTICATION_SIGNUP: {
      state = {
        ...state,
        loading: true,
      };
      break;
    }
    case AuthenticationActionEnum.AUTHENTICATION_SIGNUP_SUCCESS: {
      state = {
        ...state,
        loaded: true,
        loading: false,
        datas: JWTTokenFactory.build(action.payload),
        error: null,
      };
      break;
    }
    case AuthenticationActionEnum.AUTHENTICATION_SIGNUP_ERROR: {
      state = {
        ...state,
        loaded: false,
        loading: false,
        datas: JWTTokenFactory.build(),
        error: action.payload,
      };

      break;
    }
    case AuthenticationActionEnum.AUTHENTICATION_LOGOUT: {
      state = {
        ...state,
        loaded: true,
        loading: false,
        datas: JWTTokenFactory.build(),
        error: null,
      };
      break;
    }
    default:
      state = {
        ...state,
        datas: JWTTokenFactory.build(localStorage.getItem(JWT_LOCALE_KEY)),
      };
  }
  if (state.datas && state.datas.token) {
    localStorage.setItem(JWT_LOCALE_KEY, state.datas.token);
  } else {
    localStorage.removeItem(JWT_LOCALE_KEY);
  }

  return state;
}
