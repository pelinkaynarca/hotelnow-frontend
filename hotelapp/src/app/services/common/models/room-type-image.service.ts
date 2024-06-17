import { Injectable } from "@angular/core";
import { HttpClientService } from "../http-client.service";
import { Observable, firstValueFrom } from "rxjs";
import { ListRoomTypeImage } from "src/app/shared/models/room-type-images/list-room-type-image";
import { BaseResponse } from "src/app/shared/models/BaseResponse";
import { environment } from "src/environments/environment";
import { AddRoomTypeImage } from "src/app/shared/models/room-type-images/add-room-type-image";
import { HttpStatusCode } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class RoomTypeImageService {

  constructor(private httpClientService: HttpClientService) { }

  async getImageRoomTypeById(roomTypeId: number) {
    const observable: Observable<BaseResponse<ListRoomTypeImage>> = this.httpClientService.get({
      controller: 'room-type-images',
      action: `by-room-type/${roomTypeId}`
    });

    const response = await firstValueFrom(observable);

    if (response.statusCode === HttpStatusCode.Ok) {
      const result = response.result as ListRoomTypeImage;

      result.photos.forEach(photo => {
        photo.path = environment.photoUrl + photo.path;
      });
      return response.result;
    } else {
      return response.statusMessage;
    }
  }

  async uploadPhoto(uploads: AddRoomTypeImage[], successCallBack: () => void, errorCallBack: (errorMessage: string) => void) {
    const formData: FormData = new FormData();

    uploads.forEach(upload => {
      upload.files.forEach(file => {
        formData.append('roomTypeId', upload.roomTypeId.toString());
        formData.append('image', file, file.name);
      });
    });

    const queryString = uploads
      .map(photo => `roomTypeId=${photo.roomTypeId}`)
      .join('&');

    const observable: Observable<unknown> = this.httpClientService.post({
      controller: 'room-type-images',
      action: 'upload-image',
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

  async deleteImage(id: number, successCallBack: () => void, errorCallBack: (errorMessage: string) => void) {
    const observable: Observable<BaseResponse<number>> = this.httpClientService.delete({
      controller: 'room-type-images'
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