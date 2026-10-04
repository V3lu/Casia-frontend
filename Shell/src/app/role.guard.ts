import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { CurrentUserService } from 'Shared/Services';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const currentUserService = inject(CurrentUserService);
  const router = inject(Router);
  const allowedRoles = (route.data['roles'] as string[] | undefined) ?? [];

  if (!currentUserService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  if (!allowedRoles.length) {
    return true;
  }

  const userRole = currentUserService.getCurrentUser()?.role ?? '';
  const hasAccess = allowedRoles.some((role) => role.toLowerCase() === userRole.toLowerCase());

  return hasAccess ? true : router.createUrlTree(['/Dashboard']);
};
