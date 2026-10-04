import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiErrorService } from './api-error.service';
import { ApiNotificationService } from './api-notification.service';
import { CurrentUserService } from './current-user.service';

export const apiErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const errorService = inject(ApiErrorService);
  const notificationService = inject(ApiNotificationService);
  const currentUserService = inject(CurrentUserService);
  const router = inject(Router);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !request.url.includes('/api/Auth/login')) {
        currentUserService.logout();
        void router.navigateByUrl('/login');
      }

      notificationService.error('Request failed', errorService.getMessage(error));
      return throwError(() => error);
    }),
  );
};