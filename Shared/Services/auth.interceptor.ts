import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CurrentUserService } from './current-user.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const currentUserService = inject(CurrentUserService);
  const token = currentUserService.getToken();

  if (!token || /\/api\/Auth\/(login|refresh|logout)$/i.test(request.url)) {
    return next(request);
  }

  const clonedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(clonedRequest);
};
