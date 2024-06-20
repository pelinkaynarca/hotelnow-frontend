import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { ListRoomType } from 'src/app/shared/models/room-types/ListRoomType';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { HttpStatusCode } from '@angular/common/http';
import { AddRoomType } from 'src/app/shared/models/room-types/AddRoomType';
import { UpdateRoomType } from 'src/app/shared/models/room-types/UpdateRoomType';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

    constructor(private httpClientService: HttpClientService){}

    async getAll(){
      const observable: Observable<BaseResponse<ListRoomType[]>> = this.httpClientService.get({
          controller: 'room-types'
        });

        const response = await firstValueFrom(observable);

        return response.statusCode === HttpStatusCode.Ok 
        ? response.result 
        : response.statusMessage;
    }

    async getById(id: number){
      const observable:Observable<BaseResponse<ListRoomType>> = this.httpClientService.get({
        controller: 'room-types'
      },id);

      const response = await firstValueFrom(observable);

      return response.statusCode === HttpStatusCode.Ok
        ? response.result
        : response.statusMessage;
    }

    async create(roomType:AddRoomType, successCallBack: () => void, errorCallBack: (errorMessage: string) => void){
      const observable: Observable<AddRoomType> = this.httpClientService.post({
        controller: 'room-types'
      }, roomType);

      await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      })
    }

    async update(roomType:UpdateRoomType, successCallBack: () => void, errorCallBack: (errorMessage: string) => void){
      const observable: Observable<UpdateRoomType> = this.httpClientService.put({
        controller: 'room-types'
      }, roomType);

      await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      })
    }

    async delete(id: number, successCallBack: () => void, errorCallBack: (errorMessage: string) => void) {
      const observable:Observable<BaseResponse<ListRoomType>> = this.httpClientService.delete({
        controller:'room-types'
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
