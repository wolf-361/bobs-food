import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  // Inject the Auth service
  const token = inject(AuthService).Token;

  // Check if the token is present
  if (!token || token === '') {
    return next(req);
  }

  // Clone the request and add the authorization header
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(req);
};
