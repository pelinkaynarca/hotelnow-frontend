import { Injectable } from '@angular/core';
import { SweetAlertService } from '../admin/sweet-alert.service';
import { HttpEvent, HttpHandler, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService {

  constructor(private sweetAlertService:SweetAlertService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(req).pipe(
      catchError(error => {
        const sweetError = SweetStatus.serverError;
        switch (error.status) {
          case HttpStatusCode.InternalServerError:
            sweetError;
            break;
          case HttpStatusCode.BadRequest:
            sweetError;
            break;
          case HttpStatusCode.NotFound:
            sweetError;
            break;
          default:
            sweetError;
            break;
        }
        this.sweetAlertService.showAlert(sweetError);
      return of(error);
    }
    ));
  }
}
