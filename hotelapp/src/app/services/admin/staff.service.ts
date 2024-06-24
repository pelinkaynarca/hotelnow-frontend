import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { ListStaff } from 'src/app/shared/models/staffs/list-staff';
import { AddStaff } from 'src/app/shared/models/staffs/add-staff';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(
    private httpClientService: HttpClientService
  ) {}

  async getStaffsOfHotel() {
    const observable: Observable<BaseResponse<ListStaff[]>> =
      this.httpClientService.get({
        controller: 'staffs',
        action: 'get-staffs-of-hotel',
      });

    const baseResponse = await firstValueFrom(observable);

    return baseResponse;
  }

  async getStaffsByHotelId(hotelId: number) {
    const observable: Observable<BaseResponse<ListStaff[]>> =
      this.httpClientService.get({
        controller: 'staffs',
        action: `by-hotel-id/${hotelId}`,
      });

    const baseResponse = await firstValueFrom(observable);
    return baseResponse;
  }

  async create(addStaffRequest: AddStaff, successCallBack: () => void, errorCallBack: (errorMessage: string) => void) {
    const observable: Observable<AddStaff> =
      this.httpClientService.post({
        controller: 'staffs'
      }, addStaffRequest);

    await firstValueFrom(observable).then(response => {
      successCallBack();
      return response;
    }).catch(errorResponse => {
      errorCallBack(errorResponse);
    });
  }

  async delete(id: number) {
    const observable: Observable<BaseResponse<string>> =
      this.httpClientService.delete({
        controller: 'staffs'
      }, id);

    await firstValueFrom(observable);
  }
}
