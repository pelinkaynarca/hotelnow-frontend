import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { ListRoomType } from 'src/app/shared/models/room-types/ListRoomType';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

    constructor(private httpClientService: HttpClientService){}

    async getAll(){
      const observable: Observable<BaseResponse<ListRoomType[]>> = this.httpClientService.get(
        {controller: 'room-types', action:'get-all'});
        const response = await firstValueFrom(observable);
        return response.statusCode === 200 ? response.result : response.statusMessage;
    }
}