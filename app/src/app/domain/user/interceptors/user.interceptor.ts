import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JwtToken } from 'src/app/domain/authentication/models/class/jwt-token.model';
import { authTokenSelector } from 'src/app/shared/store/selector';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  private token: JwtToken;
  constructor(private store: Store) {
    this.store
      .pipe(select(authTokenSelector))
      .subscribe((token: JwtToken) => (this.token = token));
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: JwtToken = this.token;
    if (token === null || !token.isAuthenticated) {
      // Retourne la requête d'origine sans modifications
      return next.handle(req);
    }
    const updateReq = req.clone({
      headers: req.headers.set('Authorization', token.token),
    });
    return next.handle(updateReq);
  }
}
