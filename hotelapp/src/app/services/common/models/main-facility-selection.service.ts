import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { HttpStatusCode } from '@angular/common/http';
import { ListMainFacilitySelection } from 'src/app/shared/models/main-facility-selections/list-main-facility-selection';
import { AddMainFacilitySelection } from 'src/app/shared/models/main-facility-selections/add-main-facility-selection';

@Injectable({
  providedIn: 'root'
})
export class MainFacilitySelectionService {
  constructor(private httpClientService: HttpClientService) { }


  async getByHotelId(hotelId: number){
    const observable: Observable<BaseResponse<ListMainFacilitySelection[]>> = this.httpClientService.get({
      controller: 'main-facility-selections',
      action: 'by-hotel-id'
    }, hotelId);

    const response = await firstValueFrom(observable);

    return response.statusCode === HttpStatusCode.Ok
      ? response.result
      : response.statusMessage;
  }

  async getByHotelIdForStaff() {
    const observable: Observable<BaseResponse<ListMainFacilitySelection[]>> = this.httpClientService.get({
      controller: 'main-facility-selections',
      action: 'for-staff'
    });

    const response = await firstValueFrom(observable);

    return response.statusCode === HttpStatusCode.Ok
      ? response.result
      : response.statusMessage;
  }


  async getRandomByHotelId(hotelId: number) {
    const observable: Observable<BaseResponse<ListMainFacilitySelection[]>> = this.httpClientService.get({
      controller: 'main-facility-selections',
      action: 'random-by-hotel'
    }, hotelId);

    const response = await firstValueFrom(observable);

    return response.statusCode === HttpStatusCode.Ok
      ? response.result
      : response.statusMessage;
  }


  async create(detail: AddMainFacilitySelection, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<AddMainFacilitySelection> = this.httpClientService.post({
      controller: 'main-facility-selections'
    }, detail);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      })
  }

  async delete(id: number) {
    const observable: Observable<BaseResponse<ListMainFacilitySelection>> = this.httpClientService.delete({
      controller: 'main-facility-selections'
    }, id);

    await firstValueFrom(observable);
  }
}