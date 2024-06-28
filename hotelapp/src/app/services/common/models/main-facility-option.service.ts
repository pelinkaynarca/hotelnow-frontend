import { Injectable } from '@angular/core';
import { ListMainFacilityOption } from 'src/app/shared/models/main-facility-options/list-main-facility-option';
import { HttpClientService } from '../http-client.service';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
import { AddMainFacilityOption } from 'src/app/shared/models/main-facility-options/add-main-facility-option';
import { UpdateMainFacilityOption } from 'src/app/shared/models/main-facility-options/update-main-facility-option';

@Injectable({
  providedIn: 'root'
})
export class MainFacilityOptionService {

  constructor(private httpClientService:HttpClientService) { }

  async getAll(){
    const observable : Observable<BaseResponse<ListMainFacilityOption[]>> = this.httpClientService.get({
      controller: 'main-facility-options'
    });

  const response = await firstValueFrom(observable);

  return response.statusCode === HttpStatusCode.Ok
  ? response.result
  :response.statusMessage;
  }

  async create(mainFacilityOption:AddMainFacilityOption, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
      const observable: Observable<AddMainFacilityOption> = this.httpClientService.post({
        controller: 'main-facility-options'
      }, mainFacilityOption);

      await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      })
    }

    async update(mainFacilityOption:UpdateMainFacilityOption, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
      const observable: Observable<UpdateMainFacilityOption> = this.httpClientService.put({
        controller: 'main-facility-options'
      }, mainFacilityOption);

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
      const observable:Observable<BaseResponse<ListMainFacilityOption>> = this.httpClientService.delete({
        controller:'main-facility-options'
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
