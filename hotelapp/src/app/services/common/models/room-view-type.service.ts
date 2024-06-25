import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { HttpStatusCode } from '@angular/common/http';
import { AddRoomViewType } from 'src/app/shared/models/room-view-types/add-room-view-type';
import { ListRoomViewType } from 'src/app/shared/models/room-view-types/list-room-view-type';
import { UpdateRoomViewType } from 'src/app/shared/models/room-view-types/update-room-view-type';

@Injectable({
  providedIn: 'root'
})
export class RoomViewTypeService {

  constructor(private httpClientService: HttpClientService) { }

  async getAll(){
    const observable: Observable<BaseResponse<ListRoomViewType[]>> = this.httpClientService.get({
      controller: 'room-view-types'
    });

    const response = await firstValueFrom(observable);

    return response.statusCode === HttpStatusCode.Ok
      ? response.result
      : response.statusMessage;
  }

  async create(selection:AddRoomViewType, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const observable: Observable<AddRoomViewType> = this.httpClientService.post({
      controller: 'room-view-types'
    }, selection);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      })
  }

  async update(selection:UpdateRoomViewType, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const observable: Observable<UpdateRoomViewType> = this.httpClientService.put({
      controller: 'room-view-types'
    }, selection);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      })
  }

  async delete(id: number, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const observable: Observable<BaseResponse<ListRoomViewType>> = this.httpClientService.delete(
      {
        controller: 'room-view-types',
      }, id);

      await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response.statusCode === HttpStatusCode.Ok && response.result;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      })
  }
}
