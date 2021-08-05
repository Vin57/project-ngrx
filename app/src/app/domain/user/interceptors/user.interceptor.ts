import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtToken } from 'src/app/domain/authentication/models/class/jwt-token.model';
import { AuthService } from 'src/app/domain/authentication/services/auth.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: JwtToken = this.authService.token$.value;
    if (!token.isAuthenticated) {
      // Retourne la requête d'origine sans modifications
      return next.handle(req);
    }
    // Retourne une copie de la requête d'origine, contenant en plus un token d'authentification
    const updateReq = req.clone({
      headers: req.headers.set('Authorization', token.token),
    });
    return next.handle(updateReq);
  }
}
