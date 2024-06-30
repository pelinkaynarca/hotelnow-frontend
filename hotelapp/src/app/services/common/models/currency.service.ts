import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { HttpParams, HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpClientService: HttpClientService) { }

  async convertCurrencyToCurrency(currencyCode: string) {
    const observable: Observable<BaseResponse<string>> = this.httpClientService.get({
      controller: 'currency-rates',
      action: currencyCode
    });

    const response = await firstValueFrom(observable);
    return response.statusCode === HttpStatusCode.Ok 
    ? response.result 
    : response.statusMessage;
  }

  async convertAmountToCurrency(amount:number, currency: string):Promise<number>{
    const queryString = `amount=${encodeURIComponent(amount.toString())}&currency=${encodeURIComponent(currency)}`;

    const observable: Observable<number> = this.httpClientService.get({
      controller: 'currency-rates',
      action: 'convert',
      queryString: queryString
    })

    return await firstValueFrom(observable);
  }
}
