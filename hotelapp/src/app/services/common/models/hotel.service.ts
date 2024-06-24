import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { HttpStatusCode } from '@angular/common/http';
import { UpdateHotel } from 'src/app/shared/models/hotels/update-hotel';
import { ListHotelForStaff } from 'src/app/shared/models/hotels/list-hotel-for-staff';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private httpClientService: HttpClientService) {}

  async getAll() {
    const observable: Observable<BaseResponse<ListHotelForStaff[]>> = this.httpClientService.get({
      controller: 'hotels'
    });

    const response = await firstValueFrom(observable);

    return response.statusCode === HttpStatusCode.Ok 
      ? response.result 
      : response.statusMessage;
  }

  async getHotel() {
    const observable: Observable<BaseResponse<ListHotelForStaff>> = this.httpClientService.get({
      controller: 'hotels',
      action: 'hotel'
    });

    const response = await firstValueFrom(observable);

    return response.statusCode === HttpStatusCode.Ok
      ? response.result
      : response.statusMessage;
  }
 /*
  async create(hotel: AddHotel, successCallBack: () => void, errorCallBack: (errorMessage: string) => void) {
    const observable: Observable<AddHotel> = this.httpClientService.post({
      controller: 'hotels'
    }, hotel);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      });
  } */

  async update(hotel: UpdateHotel, successCallBack: () => void, errorCallBack: (errorMessage: string) => void) {
    const observable: Observable<UpdateHotel> = this.httpClientService.put({
      controller: 'hotels'
    }, hotel);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      });
  }
 
}