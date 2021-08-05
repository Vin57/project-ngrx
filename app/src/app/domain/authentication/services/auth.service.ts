import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription, timer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { API_URL } from 'src/app/shared/consts/api.consts';
import { IUser } from 'src/app/shared/models/user.model';
import { JwtToken } from '../models/class/jwt-token.model';
import { JWTTokenFactory } from '../models/factories/jwt-token.factory';

export const JWT_LOCALE_KEY = 'jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public subscription: Subscription = new Subscription();
  public token$: BehaviorSubject<JwtToken> = new BehaviorSubject<JwtToken>({
    isAuthenticated: null,
    token: null,
  });
  constructor(private http: HttpClient) {
    this.initToken();
    this.subscription = this.initTimer();
  }

  /**
   * Initialize token from user browser 'localeStorage'
   * if one exist.
   */
  private initToken(): void {
    const token = localStorage.getItem(JWT_LOCALE_KEY);
    this.token$.next(JWTTokenFactory.build(token != undefined, token));
  }

  /**
   * Ensure that current authentication token still
   * being refreshed.
   * @returns
   */
  public initTimer(): Subscription {
    // In real conditions, toke expire should be 15 minutes and so timer delay would be updated in consequences to be called every 5 minutes
    return timer(2000, 5000)
      .pipe(
        switchMap(() => {
          if (!localStorage.getItem(JWT_LOCALE_KEY)) {
            this.subscription.unsubscribe(); // Stop subscription to current observable (prevent calling api forever)
            return of(null); // No need to refresh an empty token
          }
          return this.http.get<string>(`${API_URL}/auth/refresh-token`).pipe(
            tap((token: string) => {
              this.registerToken(token); // Register refreshed token
            })
          );
        })
      )
      .subscribe(
        () => {}, // Do nothing on success (token has been registered previously)
        (err) => {
          // Token is no longer valid
          this.registerToken(null); // Remove token by passing null
          this.subscription.unsubscribe(); // Stop subscription to current observable (prevent calling api forever)
        }
      );
  }

  /**
   * Send a given token through 'this.token$' BehaviorSubject,
   * and save it under user browser 'localeStorage'.
   * @param {string|null} token A token to register, or null
   * to invalidate current token.
   */
  private registerToken(token?: string): void {
    this.token$.next(JWTTokenFactory.build(token != undefined, token));
    if (token) {
      localStorage.setItem(JWT_LOCALE_KEY, token);
    } else {
      localStorage.removeItem(JWT_LOCALE_KEY);
    }
  }

  /**
   * Signup a user
   * @param user
   * @returns
   */
  signup(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${API_URL}/auth/signup`, user);
  }

  /**
   * Signin a user
   * @param credentials
   * @returns
   */
  signin(credentials: { email: string; password: string }): Observable<string> {
    return this.http.post<string>(`${API_URL}/auth/signin`, credentials).pipe(
      tap((token: string) => {
        this.registerToken(token);
        this.subscription = this.initTimer(); // Subscribe to refresh token automaticaly
      }),
      map((token: string) => token)
    );
  }

  /**
   * Logout current user
   */
  logout(): void {
    // Send empty token into BehaviorSubject
    this.token$.next(JWTTokenFactory.build());
    // Remove jwt from localStorage
    localStorage.removeItem(JWT_LOCALE_KEY);
  }

  /**
   * Check whether or not, current token is authenticated.
   * @returns
   */
  isAuthenticated(): Observable<boolean> {
    return this.token$.pipe(map((token: JwtToken) => token.isAuthenticated));
  }
}
