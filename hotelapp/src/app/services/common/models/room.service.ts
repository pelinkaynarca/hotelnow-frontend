import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { ListRoom } from 'src/app/shared/models/rooms/list-room';
import { HttpStatusCode } from '@angular/common/http';
import { AddRoom } from 'src/app/shared/models/rooms/add-room';
import { UpdateRoom } from 'src/app/shared/models/rooms/update-room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private httpClientService:HttpClientService) { }
  
  async getRoomsByRoomTypeId(roomTypeId:number){
    const observable : Observable<BaseResponse<ListRoom[]>> = this.httpClientService.get({
      controller:'rooms',
      action: `by-room-type/${roomTypeId}`
    });

    const response = await firstValueFrom(observable);

        return response.statusCode === HttpStatusCode.Ok 
        ? response.result 
        : response.statusMessage;
  }

  async create(room:AddRoom, successCallBack: () => void, errorCallBack: (errorMessage: string) => void){
    const observable: Observable<AddRoom> = this.httpClientService.post({
      controller: 'rooms',
      action: 'create-room'
    }, room);

    await firstValueFrom(observable)
    .then(response => {
      successCallBack();
      return response;
    })
    .catch(errorResponse => {
      errorCallBack(errorResponse);
    })
  }

  async update(room:UpdateRoom, successCallBack: () => void, errorCallBack: (errorMessage: string) => void){
    const observable: Observable<UpdateRoom> = this.httpClientService.put({
      controller: 'rooms',
      action: 'update-room'
    }, room);

    await firstValueFrom(observable)
    .then(response => {
      successCallBack();
      return response;
    })
    .catch(errorResponse => {
      errorCallBack(errorResponse);
    })
  }

  async delete(id: number, successCallBack: () => void, errorCallBack: (errorMessage: string) => void){
    const observable: Observable<BaseResponse<ListRoom>> = this.httpClientService.delete(
      {
        controller: 'rooms',
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
