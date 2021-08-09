import { IUser } from 'src/app/shared/models/user.model';
import { JwtToken } from '../models/class/jwt-token.model';
import { JWTTokenFactory } from '../models/factories/jwt-token.factory';
import { JWT_LOCALE_KEY } from '../services/auth.service';
import {
  AuthenticationActionEnum,
  AuthenticationActions,
} from './authentication.actions';

export interface AuthenticationState {
  jwtToken: JwtToken;
  currentUser: IUser;
  loaded: boolean;
  loading: boolean;
  error: any;
}

const initialState: AuthenticationState = {
  jwtToken: null,
  currentUser: null,
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
        jwtToken: JWTTokenFactory.build(action.payload),
        error: null,
      };
      break;
    }
    case AuthenticationActionEnum.AUTHENTICATION_SIGNIN_ERROR: {
      state = {
        ...state,
        loaded: false,
        loading: false,
        jwtToken: JWTTokenFactory.build(),
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
        jwtToken: JWTTokenFactory.build(action.payload),
        error: null,
      };
      break;
    }
    case AuthenticationActionEnum.AUTHENTICATION_SIGNUP_ERROR: {
      state = {
        ...state,
        loaded: false,
        loading: false,
        jwtToken: JWTTokenFactory.build(),
        error: action.payload,
      };

      break;
    }
    case AuthenticationActionEnum.AUTHENTICATION_LOGOUT: {
      state = {
        ...state,
        loaded: true,
        loading: false,
        jwtToken: JWTTokenFactory.build(),
        error: null,
      };
      break;
    }
    case AuthenticationActionEnum.AUTHENTICATION_SET_CURRENT_USER: {
      state = {
        ...state,
        loaded: true,
        loading: false,
        currentUser: action.payload,
        error: null,
      };
      break;
    }
    default:
      state = {
        ...state,
        jwtToken: JWTTokenFactory.build(localStorage.getItem(JWT_LOCALE_KEY)),
      };
  }
  if (state.jwtToken && state.jwtToken.token) {
    localStorage.setItem(JWT_LOCALE_KEY, state.jwtToken.token);
  } else {
    localStorage.removeItem(JWT_LOCALE_KEY);
  }

  return state;
}
