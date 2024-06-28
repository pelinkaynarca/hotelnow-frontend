import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpClientService: HttpClientService) { }

  async convertCurrencyToTurkishLira(amount: number, currencyCode: any): Promise<number> {
    const observable: Observable<BaseResponse<any>> = this.httpClientService.get({
      controller: 'currency-rates'
    }, currencyCode);

    const response = await firstValueFrom(observable);
    if (response.statusCode === HttpStatusCode.Ok && response.result) {
      const exchangeRate = response.result
      return amount / exchangeRate;
    } else {
      return amount;
    }
  }
}
