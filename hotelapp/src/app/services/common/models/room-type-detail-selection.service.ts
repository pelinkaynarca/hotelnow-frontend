import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { ListRoomTypeDetailSelection } from 'src/app/shared/models/room-type-detail-selections/list-room-type-detail-selection';
import { HttpStatusCode } from '@angular/common/http';
import { AddRoomTypeDetailSelection } from 'src/app/shared/models/room-type-detail-selections/add-room-type-detail-selection';
import { RoomTypeDetailSelection } from 'src/app/shared/models/room-type-detail-selections/room-type-detail-selection';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeDetailSelectionService {

  constructor(private httpClientService: HttpClientService) { }

  async getByRoomTypeId(roomTypeId: number) {
    const observable: Observable<BaseResponse<ListRoomTypeDetailSelection[]>> = this.httpClientService.get({
      controller: 'room-type-facility-detail-selections',
      action: 'by-room-type-id'
    }, roomTypeId);

    const response = await firstValueFrom(observable);

    return response.statusCode === HttpStatusCode.Ok
      ? response.result
      : response.statusMessage;
  }

  async create(detail: AddRoomTypeDetailSelection[], successCallBack: () => void, errorCallBack: (errorMessage: string) => void) {
    const observable: Observable<AddRoomTypeDetailSelection[]> = this.httpClientService.post({
      controller: 'room-type-facility-detail-selections'
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
    const observable: Observable<BaseResponse<RoomTypeDetailSelection>> = this.httpClientService.delete({
      controller: 'room-type-facility-detail-selections'
    }, id);

    await firstValueFrom(observable);
  }
}
