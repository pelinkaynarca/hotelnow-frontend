import { Injectable } from '@angular/core';
import { SweetAlertService } from '../admin/sweet-alert.service';
import { HttpEvent, HttpHandler, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { UserAuthService } from './models/user-auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService {

  constructor(private sweetAlertService: SweetAlertService, private userAuthService: UserAuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(error => {
        switch (error.status) {
          // case HttpStatusCode.Unauthorized:
          //   const refreshToken = localStorage.getItem('refreshToken');
          //   this.userAuthService.refreshTokenLogin(refreshToken);
          //   if (!refreshToken) {
          //     const url = this.router.url;
          //     if (url == "/admin") {
          //       this.sweetAlertService.showAlert(SweetStatus.sweetExpired);
          //       this.router.navigate(['/admin/login']);
          //     }
          //     else {
          //       this.sweetAlertService.showAlert(SweetStatus.sweetUnauthorized);
          //       this.router.navigate(['/admin/login']);
          //     }
          //   }
          //   break;
          //case HttpStatusCode.Forbidden:
          case HttpStatusCode.InternalServerError:
          case HttpStatusCode.BadRequest:
          case HttpStatusCode.NotFound:
          default:
            this.sweetAlertService.showAlert(SweetStatus.serverError);
            break;
        }
        return of(error);
      })
    );
  }
}