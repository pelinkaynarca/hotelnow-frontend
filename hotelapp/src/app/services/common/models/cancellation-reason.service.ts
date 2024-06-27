import { Injectable } from '@angular/core';
import { ListCancellationReason } from 'src/app/shared/models/cancellation-reasons/list-cancellation-reason';
import { HttpClientService } from '../http-client.service';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CancellationReasonService {

  constructor(private httpClientService:HttpClientService) { }

  async getAll(){
    const observable : Observable<BaseResponse<ListCancellationReason[]>> = this.httpClientService.get({
      controller: 'cancellation-reasons'
    });

  const response = await firstValueFrom(observable);

  return response.statusCode === HttpStatusCode.Ok
  ? response.result
  :response.statusMessage;
  }
}
