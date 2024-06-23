import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { HttpStatusCode } from '@angular/common/http';
import { ListRoomTypeFacilityCategory } from 'src/app/shared/models/room-type-facility-categories/list-room-type-facility-category';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeFacilityCategoryService {

  constructor(private httpClientService: HttpClientService) { }

  async getAll(){
    const observable: Observable<BaseResponse<ListRoomTypeFacilityCategory[]>> = this.httpClientService.get({
      controller: 'room-type-main-facility-categories'
    });

    const response = await firstValueFrom(observable);

    return response.statusCode === HttpStatusCode.Ok
    ? response.result
    : response.statusMessage;
  }

}
