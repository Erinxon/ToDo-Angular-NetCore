import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private readonly localStorage: LocalStorageService,
    private toastrService: ToastrService,
    private jwtHelperService: JwtHelperService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token: string = this.localStorage.getItem('token');
    if (token) {
      const isExpired = this.jwtHelperService.isTokenExpired(token);
      if (isExpired) {
        this.auth.logout();
        this.toastrService.error('Tu sesión ha expirado, vuelve a inicial sesión');
        return EMPTY;
      }
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${this.jwtHelperService.tokenGetter().toString()}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 401) {
          this.auth.logout();
        }
        return throwError(response);
      })
    );
  }
}