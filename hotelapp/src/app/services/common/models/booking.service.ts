import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { BookingStatus } from 'src/app/shared/models/bookings/booking-status';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { ListBooking } from 'src/app/shared/models/bookings/list-booking';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClientService: HttpClientService) { }

  async getByStatus(status: BookingStatus) {
    let actionUrl = "";
    if (status === BookingStatus.PEND) {
      actionUrl = "pending-list";
    }
    else if (status === BookingStatus.APPR) {
      actionUrl = "approved-list";
    }
    else if (status === BookingStatus.CANC) {
      actionUrl = "cancelled-list";
    }
    const observable: Observable<BaseResponse<ListBooking[]>> = this.httpClientService.get({
      controller: 'bookings',
      action: actionUrl
    });

    const response = await firstValueFrom(observable);

    return response.statusCode === HttpStatusCode.Ok
      ? response.result
      : response.statusMessage;
  }

  async approve(bookingId: number,successCallBack: (response:BaseResponse<string>) => void, errorCallBack: (errorMessage: string) => void) {
    const observable: Observable<BaseResponse<string>> = this.httpClientService.get({
      controller: 'bookings',
      action: `approve/${bookingId}`
    });
    const baseResponse = await firstValueFrom(observable).then(response => {
      successCallBack(response);
    }).catch(errorResponse => {
      errorCallBack(errorResponse);
    });
  }

  async cancel(bookingId: number,successCallBack: (response:BaseResponse<string>) => void, errorCallBack: (errorMessage: string) => void) {
    const observable: Observable<BaseResponse<string>> = this.httpClientService.get({
      controller: 'bookings',
      action: `cancel/${bookingId}`
    });
    const baseResponse = await firstValueFrom(observable).then(response => {
      successCallBack(response);
    }).catch(errorResponse => {
      errorCallBack(errorResponse);
    });
  }
}
