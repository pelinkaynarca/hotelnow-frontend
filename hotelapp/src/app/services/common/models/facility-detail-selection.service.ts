import { Injectable } from "@angular/core";
import { HttpClientService } from "../http-client.service";
import { ListFacilityDetailSelection } from "src/app/shared/models/facility-detail-selections/list-facility-detail-selection";
import { BaseResponse } from "src/app/shared/models/BaseResponse";
import { Observable, firstValueFrom } from "rxjs";
import { HttpStatusCode } from "@angular/common/http";
import { AddFacilityDetailSelection } from "src/app/shared/models/facility-detail-selections/add-facility-detail-selection";
import { FacilityDetailSelection } from "src/app/shared/models/facility-detail-selections/facility-detail-selection";

@Injectable({
    providedIn: 'root'
})
export class FacilityDetailSelectionService {

    constructor(private httpClientService: HttpClientService) { }

    async getByHotelId(hotelId: number) {
        const observable: Observable<BaseResponse<ListFacilityDetailSelection[]>> = this.httpClientService.get({
            controller: 'facility-detail-selections',
            action: 'by-hotel-id'
        }, hotelId);

        const response = await firstValueFrom(observable);

        return response.statusCode === HttpStatusCode.Ok
            ? response.result
            : response.statusMessage;
    }

    async getFacilityDetailSelenctionStaff() {
        const observable: Observable<BaseResponse<ListFacilityDetailSelection[]>> = this.httpClientService.get({
            controller: 'facility-detail-selections',
            action: 'facility-detail-selection'
        });

        const response = await firstValueFrom(observable);

        return response.statusCode === HttpStatusCode.Ok
            ? response.result
            : response.statusMessage;
    }


    async create(detail: AddFacilityDetailSelection[], successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
        const observable: Observable<AddFacilityDetailSelection[]> = this.httpClientService.post({
            controller: 'facility-detail-selections'
        }, detail);

        await firstValueFrom(observable)
            .then(response => {
                successCallBack();
                return response;
            })
            .catch(errorResponse => {
                errorCallBack(errorResponse);
            })
    }

    async delete(id: number) {
        const observable: Observable<BaseResponse<FacilityDetailSelection>> = this.httpClientService.delete({
            controller: 'room-type-facility-detail-selections'
        }, id);

        await firstValueFrom(observable);
    }
}