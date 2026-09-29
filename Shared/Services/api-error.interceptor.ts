import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ApiErrorService } from './api-error.service';
import { ApiNotificationService } from './api-notification.service';

export const apiErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const errorService = inject(ApiErrorService);
  const notificationService = inject(ApiNotificationService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      notificationService.error('Request failed', errorService.getMessage(error));
      return throwError(() => error);
    }),
  );
};