import { Injectable } from "@angular/core";
import { HttpClientService } from "../http-client.service";
import { UserRegister } from "src/app/shared/models/users/register";
import { Observable, firstValueFrom } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  async create(register: UserRegister, successCallBack: () => void, errorCallBack: (errorMessage: string) => void) {
    const observable: Observable<UserRegister> = this.httpClientService.post({
      controller: 'customers',
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
}

