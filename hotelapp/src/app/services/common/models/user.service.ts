import { Injectable } from "@angular/core";
import { HttpClientService } from "../http-client.service";
import { UserRegister } from "src/app/shared/models/users/register";
import { Observable, firstValueFrom } from "rxjs";
import { ListUser } from "src/app/shared/models/users/list-user";
import { BaseResponse } from "src/app/shared/models/BaseResponse";
import { HttpStatusCode } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  async create(register: UserRegister, successCallBack: () => void, errorCallBack: (errorMessage: string) => void) {
    const observable: Observable<UserRegister> = this.httpClientService.post({
      controller: 'auth',
      action: 'register'
    }, register);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      })
  }

  async getAll(){
    const observable: Observable<BaseResponse<ListUser[]>> = this.httpClientService.get({
      controller: 'users',
    });

    const response = await firstValueFrom(observable);

        return response.statusCode === HttpStatusCode.Ok 
        ? response.result 
        : response.statusMessage;
  }
}

