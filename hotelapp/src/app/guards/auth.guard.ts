
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from "@angular/router";
import { AuthService, _isAuthenticated } from "../services/common/auth.service";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);

  if (!_isAuthenticated) {
    console.log('Token yok');
    router.navigate(["admin/login"], { queryParams: { returnUrl: state.url } });
  }
  console.log('Token var')
  return true;

}