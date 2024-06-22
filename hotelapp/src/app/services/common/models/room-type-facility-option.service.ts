import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { ListRoomTypeFacilityOption } from 'src/app/shared/models/room-type-facility-option/list-room-type-facility-option';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeFacilityOptionService {

  constructor(private httpClientService: HttpClientService) { }

  async getAll(){
    const observable: Observable<BaseResponse<ListRoomTypeFacilityOption[]>> = this.httpClientService.get({
      controller: 'room-type-main-facility-options',
      action: 'get-all'
    });

    const response = await firstValueFrom(observable);

    return response.statusCode === HttpStatusCode.Ok
    ? response.result
    : response.statusMessage;
  }

  
}
