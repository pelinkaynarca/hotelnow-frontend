import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { HttpStatusCode } from '@angular/common/http';
import { ListRoomTypeDetailCategory } from 'src/app/shared/models/room-type-detail-categories/list-room-type-detail-category';

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
}
