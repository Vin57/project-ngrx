import { Action } from '@ngrx/store';
import { IUser } from 'src/app/shared/models/user.model';
import { Credential } from './models/credential.model';

export enum AuthenticationActionEnum {
  // SIGNIN
  AUTHENTICATION_SIGNIN = '[authentication] signin',
  AUTHENTICATION_SIGNIN_SUCCESS = '[authentication] signin success',
  AUTHENTICATION_SIGNIN_ERROR = '[authentication] signin error',
  // SIGNUP
  AUTHENTICATION_SIGNUP = '[authentication] signup',
  AUTHENTICATION_SIGNUP_SUCCESS = '[authentication] signup success',
  AUTHENTICATION_SIGNUP_ERROR = '[authentication] signup error',
  // LOGOUT
  AUTHENTICATION_LOGOUT = '[authentication] logout',
  // REFRESH TOKEN
  AUTHENTICATION_REFRESH_TOKEN = '[authentication] refresh token',
  // CURRENT USER
  AUTHENTICATION_FETCH_CURRENT_USER = '[authentication] fetch current user',
  AUTHENTICATION_SET_CURRENT_USER = '[authentication] set current user',
}

/*********************************
 * AUTHENTICATION_SIGNIN
 *********************************/

export class AuthenticationSignin implements Action {
  readonly type: string = AuthenticationActionEnum.AUTHENTICATION_SIGNIN;

  /**
   * @param payload Credentials to send to backend for signin verification.
   */
  constructor(public payload: Credential) {}
}

export class AuthenticationSigninSuccess implements Action {
  readonly type: string =
    AuthenticationActionEnum.AUTHENTICATION_SIGNIN_SUCCESS;

  /**
   * @param payload A token from backend, matching sended credentials.
   */
  constructor(public payload: string) {}
}

export class AuthenticationSigninError implements Action {
  readonly type: string = AuthenticationActionEnum.AUTHENTICATION_SIGNIN_ERROR;

  /**
   * @param payload Any error which has occured.
   */
  constructor(public payload?: any) {}
}

/*********************************
 * AUTHENTICATION_SIGNUP
 *********************************/

export class AuthenticationSignup implements Action {
  readonly type: string = AuthenticationActionEnum.AUTHENTICATION_SIGNUP;

  /**
   * @param payload A new user which should be persisted.
   */
  constructor(public payload: IUser) {}
}

export class AuthenticationSignupSuccess implements Action {
  readonly type: string =
    AuthenticationActionEnum.AUTHENTICATION_SIGNUP_SUCCESS;

  constructor(public payload?: any) {}
}

export class AuthenticationSignupError implements Action {
  readonly type: string = AuthenticationActionEnum.AUTHENTICATION_SIGNUP_ERROR;

  /**
   * @param payload Any error which has occured.
   */
  constructor(public payload: any) {}
}

/*********************************
 * AUTHENTICATION_LOGOUT
 *********************************/

export class AuthenticationLogout implements Action {
  readonly type: string = AuthenticationActionEnum.AUTHENTICATION_LOGOUT;

  constructor(public payload?: any) {}
}

/*********************************
 * AUTHENTICATION_REFRESH_TOKEN
 *********************************/

export class AuthenticationRefreshToken implements Action {
  readonly type: string = AuthenticationActionEnum.AUTHENTICATION_REFRESH_TOKEN;

  constructor(public payload?: any) {}
}

/*********************************
 * AUTHENTICATION_FETCH_CURRENT_USER
 *********************************/
export class AuthenticationFetchCurrentUser implements Action {
  readonly type: string =
    AuthenticationActionEnum.AUTHENTICATION_FETCH_CURRENT_USER;

  constructor(public payload?: any) {}
}

export class AuthenticationSetCurrentUser implements Action {
  readonly type: string =
    AuthenticationActionEnum.AUTHENTICATION_SET_CURRENT_USER;

  constructor(public payload?: any) {}
}

export type AuthenticationSigninActions =
  | AuthenticationSignin
  | AuthenticationSigninSuccess
  | AuthenticationSigninError;
export type AuthenticationSignupActions =
  | AuthenticationSignup
  | AuthenticationSignupSuccess
  | AuthenticationSignupError;

export type AuthenticationCurrentUser =
  | AuthenticationFetchCurrentUser
  | AuthenticationSetCurrentUser;

export type AuthenticationActions =
  | AuthenticationSigninActions
  | AuthenticationSignupActions
  | AuthenticationLogout
  | AuthenticationCurrentUser;
