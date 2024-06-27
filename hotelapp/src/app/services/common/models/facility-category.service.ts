import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { ListFacilityCategory } from 'src/app/shared/models/facility-categories/list-facility-category';
import { HttpStatusCode } from '@angular/common/http';
import { UpdateFacilityCategory } from 'src/app/shared/models/facility-categories/update-facility-category';
import { AddFacilityCategory } from 'src/app/shared/models/facility-categories/add-facility-category';

@Injectable({
  providedIn: 'root'
})
export class FacilityCategoryService {

  constructor(private httpClientService:HttpClientService) { }

  async getAll(){
    const observable : Observable<BaseResponse<ListFacilityCategory[]>> = this.httpClientService.get({
      controller: 'facility-categories'
    });

  const response = await firstValueFrom(observable);

  return response.statusCode === HttpStatusCode.Ok
  ? response.result
  :response.statusMessage;
  }

  async create(facilityCategory:AddFacilityCategory, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
      const observable: Observable<AddFacilityCategory> = this.httpClientService.post({
        controller: 'facility-categories'
      }, facilityCategory);

      await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      })
    }

    async update(facilityCategory:UpdateFacilityCategory, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
      const observable: Observable<UpdateFacilityCategory> = this.httpClientService.put({
        controller: 'facility-categories'
      }, facilityCategory);

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
      const observable:Observable<BaseResponse<ListFacilityCategory>> = this.httpClientService.delete({
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