import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { AddRoomTypeDetailSelection } from 'src/app/shared/models/room-type-detail-selection/add-room-type-detail-selection';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { ListRoomTypeDetailSelection } from 'src/app/shared/models/room-type-detail-selection/list-room-type-detail-selection';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeDetailSelectionService {

  constructor(private httpClientService: HttpClientService) { }

  async getByRoomTypeId(roomTypeId: number) {
    const observable: Observable<BaseResponse<ListRoomTypeDetailSelection[]>> = this.httpClientService.get({
      controller: 'room-type-facility-detail-selections',
      action: 'by-room-type'
    }, roomTypeId);

    const response = await firstValueFrom(observable);

    return response.statusCode === HttpStatusCode.Ok
      ? response.result
      : response.statusMessage;
  }

  async create(detail: AddRoomTypeDetailSelection, successCallBack: () => void, errorCallBack: (errorMessage: string) => void) {
    const observable: Observable<AddRoomTypeDetailSelection> = this.httpClientService.post({
      controller: 'room-type-facility-detail-selections',
      action: 'create-facility-detail'
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
