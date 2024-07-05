import { Injectable } from "@angular/core";
import { HttpClientService } from "../http-client.service";
import { Observable, firstValueFrom } from "rxjs";
import { ListHotelImage } from "src/app/shared/models/hotel-images/list-hotel-image";
import { BaseResponse } from "src/app/shared/models/BaseResponse";
import { environment } from "src/environments/environment";
import { AddHotelImage } from "src/app/shared/models/hotel-images/add-hotel-image";
import { HttpStatusCode } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class HotelImageService {

  constructor(private httpClientService: HttpClientService) { }

  async getHotelImageByHotelId(hotelId: number) {
    const observable: Observable<BaseResponse<ListHotelImage>> = this.httpClientService.get({
      controller: 'hotel-images',
      action: 'by-hotel-id'
    },hotelId);

    const response = await firstValueFrom(observable);

    if (response.statusCode === HttpStatusCode.Ok) {
      const result = response.result as ListHotelImage;

      result.photos.forEach(photo => {
        photo.path = environment.photoUrl + photo.path;
      });
      return response.result;
    } else {
      return response.statusMessage;
    }
  }

  async uploadPhoto(uploads: AddHotelImage[], successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const formData: FormData = new FormData();

    uploads.forEach(upload => {
      upload.files.forEach(file => {
        formData.append('hotelId', upload.hotelId.toString());
        formData.append('image', file, file.name);
      });
    });

    const queryString = uploads
      .map(photo => `hotelId=${photo.hotelId}`)
      .join('&');

    const observable: Observable<unknown> = this.httpClientService.post({
      controller: 'hotel-images',
      queryString: queryString
    }, formData);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      })
  }

  async deleteImage(id: number, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<BaseResponse<number>> = this.httpClientService.delete({
      controller: 'hotel-images'
    }, id);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      })
  }
}