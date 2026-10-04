import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CurrentUserService } from 'Shared/Services';

export const authGuard: CanActivateFn = () => {
  const currentUserService = inject(CurrentUserService);
  const router = inject(Router);

  return currentUserService.isAuthenticated() ? true : router.createUrlTree(['/login']);
};

export const publicOnlyGuard: CanActivateFn = () => {
  const currentUserService = inject(CurrentUserService);
  const router = inject(Router);

  return currentUserService.isAuthenticated() ? router.createUrlTree(['/Dashboard']) : true;
};
