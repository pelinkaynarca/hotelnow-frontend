import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { HttpStatusCode } from '@angular/common/http';
import { ListRoomTypeDetailCategory } from 'src/app/shared/models/room-type-detail-categories/list-room-type-detail-category';
import { AddRoomTypeDetailCategory } from 'src/app/shared/models/room-type-detail-categories/add-room-type-detail-category';
import { UpdateRoomTypeDetailCategory } from 'src/app/shared/models/room-type-detail-categories/update-room-type-detail-category';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeDetailCategoryService {

  constructor(private httpClientService:HttpClientService) { }

  async getAll(){
    const observable : Observable<BaseResponse<ListRoomTypeDetailCategory[]>> = this.httpClientService.get({
      controller: 'room-type-facility-categories'
    });

    const response = await firstValueFrom(observable);

    return response.statusCode === HttpStatusCode.Ok
    ? response.result
    : response.statusMessage;
  }

  async create(roomTypeDetailCategory:AddRoomTypeDetailCategory, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const observable: Observable<AddRoomTypeDetailCategory> = this.httpClientService.post({
      controller: 'room-type-facility-categories'
    }, roomTypeDetailCategory);

    await firstValueFrom(observable)
    .then(response => {
      successCallBack();
      return response;
    })
    .catch(errorResponse => {
      errorCallBack(errorResponse);
    })
  }

  async update(roomTypeDetailCategory:UpdateRoomTypeDetailCategory, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const observable: Observable<UpdateRoomTypeDetailCategory> = this.httpClientService.put({
      controller: 'room-type-detail-categories'
    }, roomTypeDetailCategory);

    await firstValueFrom(observable)
    .then(response => {
      successCallBack();
      return response;
    })
    .catch(errorResponse => {
      errorCallBack(errorResponse);
    })
  }

  async delete(id: number, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable:Observable<BaseResponse<ListRoomTypeDetailCategory>> = this.httpClientService.delete({
      controller:'facility-categories'
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
