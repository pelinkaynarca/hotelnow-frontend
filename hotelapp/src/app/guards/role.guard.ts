import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from "@angular/router";
import { AuthService } from "../services/common/auth.service";

export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const roles = route.data['roles'] as Array<string>;
  if (authService.canShowForRoles(roles)) {
    return true;
  }

  router.navigate(['/unauthorized'], { queryParams: { returnUrl: '/admin' } });
  return false;
}