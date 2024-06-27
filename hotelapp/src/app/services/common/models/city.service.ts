import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
import { ListCity } from 'src/app/shared/models/cities/list-city';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClientService: HttpClientService) { }

  async getAll(){
    const observable: Observable<BaseResponse<ListCity[]>> = this.httpClientService.get(
      {controller: 'cities', action:''});
      const response = await firstValueFrom(observable);
      return response.statusCode === HttpStatusCode.Ok 
      ? response.result 
      : response.statusMessage;
  }

  async getByCityId(id: number){
    const observable:Observable<BaseResponse<ListCity>> = this.httpClientService.get({
      controller: 'cities'
    },id);

    const response = await firstValueFrom(observable);

    return response.statusCode === HttpStatusCode.Ok
      ? response.result
      : response.statusMessage;
  }
}
