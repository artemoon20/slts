import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { catchError, switchMap, throwError, Observable } from 'rxjs';
import { BehaviorSubject, filter, take } from 'rxjs';

let isRefreshing = false;
let refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

function handle401Error(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<unknown>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap(response => {
        isRefreshing = false;
        const newToken = response.accessToken;

        authService.saveToken(newToken);
        refreshTokenSubject.next(newToken);

        return next(
          request.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`
            }
          })
        );
      }),
      catchError(error => {
        isRefreshing = false;
        refreshTokenSubject.next(null);

        // If refresh failed, logout user
        authService.logout();
        return throwError(() => error);
      })
    );
  } else {
    // If refresh is already in progress, wait for it to complete
    return refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(token => {
        return next(
          request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          })
        );
      })
    );
  }
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse): Observable<HttpEvent<unknown>> => {
      // If error is 401 and we haven't already tried refreshing
      if (error.status === 401 && !req.url.includes('/auth/refresh')) {
        return handle401Error(req, next, authService);
      }

      return throwError(() => error);
    })
  );
};
