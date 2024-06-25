import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { HttpStatusCode } from '@angular/common/http';
import { ListRoomBedType } from 'src/app/shared/models/room-bed-types/list-bed-type';
import { AddRoomBedType } from 'src/app/shared/models/room-bed-types/add-bed-type';
import { UpdateRoomBedType } from 'src/app/shared/models/room-bed-types/update-bed-type';


@Injectable({
  providedIn: 'root'
})
export class RoomBedTypeService {

  constructor(private httpClientService: HttpClientService) { }

  async getAll(){
    const observable: Observable<BaseResponse<ListRoomBedType[]>> = this.httpClientService.get({
      controller: 'room-bed-types'
    });

    const response = await firstValueFrom(observable);

    return response.statusCode === HttpStatusCode.Ok
      ? response.result
      : response.statusMessage;
  }

  async create(selection:AddRoomBedType, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const observable: Observable<AddRoomBedType> = this.httpClientService.post({
      controller: 'room-bed-types'
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

  async update(selection:UpdateRoomBedType, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const observable: Observable<UpdateRoomBedType> = this.httpClientService.put({
      controller: 'room-bed-types'
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
    const observable: Observable<BaseResponse<ListRoomBedType>> = this.httpClientService.delete(
      {
        controller: 'room-bed-types',
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
