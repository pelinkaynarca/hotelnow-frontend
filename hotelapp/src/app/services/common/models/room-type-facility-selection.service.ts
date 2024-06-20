import { Injectable } from '@angular/core';
import { AddRoomTypeFacilitySelection } from 'src/app/shared/models/room-type-facility-selection/add-room-type-facility-selection';
import { HttpClientService } from '../http-client.service';
import { ListRoomTypeFacilitySelection } from 'src/app/shared/models/room-type-facility-selection/list-room-type-facility-selection';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeFacilitySelectionService {

  constructor(private httpClientService: HttpClientService) { }

  async getByRoomTypeId(roomTypeId:number){
    const observable: Observable<BaseResponse<ListRoomTypeFacilitySelection[]>> = this.httpClientService.get({
      controller: 'room-type-main-facility-selections',
      action: 'by-room-type-id'
    }, roomTypeId);

    const response = await firstValueFrom(observable);

    return response.statusCode === HttpStatusCode.Ok
      ? response.result
      : response.statusMessage;
  }

  async create(detail:AddRoomTypeFacilitySelection, successCallBack: () => void, errorCallBack: (errorMessage: string) => void){
    const observable: Observable<AddRoomTypeFacilitySelection> = this.httpClientService.post({
      controller: 'room-type-main-facility-selections'
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
}
