import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {

  // Inject the AuthService
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is logged in
  if (!authService.IsAuthenticated) {
    router.navigate(['/auth/login']);
    return false;
  }

  // Check if a role is needed
  const neededRole = route.data['role'];
  if (!neededRole || neededRole === 'none' || neededRole === '') {
    return true;
  }

  // Check if there are multiple needed roles and if the user has one of them
  if (neededRole.includes(',')) {
    const roles = neededRole.split(',');
    for (const role of roles) {
      // Remove the spaces
      if (authService.hasRole(role.trim())) {
        return true;
      }
    }
    router.navigate(['/auth/login']);
    return false;
  }
};
