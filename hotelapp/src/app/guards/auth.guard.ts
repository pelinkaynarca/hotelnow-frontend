import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from "@angular/router";
import { AuthService } from "../services/common/auth.service";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    router.navigate(['/admin/login']);
    return false;
  }

  if (authService.hasRole('CUSTOMER')) {
    router.navigate(['/admin/login']);
    return false;
  }

  return true;
}