import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { ListNeighborhood } from 'src/app/shared/models/neighborhoods/list-neighborhood';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class NeighborhoodService {
  
    constructor(private httpClientService: HttpClientService){}
  
    async getAll(){
      const observable: Observable<BaseResponse<ListNeighborhood[]>> = this.httpClientService.get(
        {controller: 'neighborhoods', action:''});
        const response = await firstValueFrom(observable);
        return response.statusCode === HttpStatusCode.Ok 
        ? response.result 
        : response.statusMessage;
    }

    async getById(id: number) {
      const observable: Observable<BaseResponse<ListNeighborhood>> = this.httpClientService.get(
        { controller: 'neighborhoods', action: `${id}` }
      );
      const response = await firstValueFrom(observable);
      return response.statusCode === HttpStatusCode.Ok
      ? response.result
      : response.statusMessage;
    }

    async getByDistrictId(districtId: number) {
      const observable: Observable<BaseResponse<ListNeighborhood[]>> = this.httpClientService.get(
        { controller: 'neighborhoods', action: `by-district-id/${districtId}` }
      );
      const response = await firstValueFrom(observable);
      return response.statusCode === HttpStatusCode.Ok
        ? response.result
        : response.statusMessage;
    }
}
