import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { ListDistrict } from 'src/app/shared/models/districts/list-district';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class DistrictService {
  
    constructor(private httpClientService: HttpClientService){}
  
    async getAll(){
      const observable: Observable<BaseResponse<ListDistrict[]>> = this.httpClientService.get(
        {controller: 'districts', action:''});
        const response = await firstValueFrom(observable);
        return response.statusCode === HttpStatusCode.Ok 
        ? response.result 
        : response.statusMessage;
    }

    async getByCityId(id: number){
      const observable:Observable<BaseResponse<ListDistrict[]>> = this.httpClientService.get({
        controller: 'districts',
        action: 'by-city-id'
      },id);

      const response = await firstValueFrom(observable);

      return response.statusCode === HttpStatusCode.Ok
        ? response.result
        : response.statusMessage;
    }
}
