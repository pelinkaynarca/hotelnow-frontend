import { Injectable } from "@angular/core";
import { Observable, firstValueFrom } from "rxjs";
import { TokenResponse } from "src/app/shared/models/tokens/token-response";
import { UserLogin } from "src/app/shared/models/users/login";
import { HttpClientService } from "../http-client.service";

@Injectable({
    providedIn: 'root'
})

export class UserAuthService {

    constructor(private httpClientService: HttpClientService) { }

    async login(user: UserLogin, successCallBack: () => void): Promise<void> {
        const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
            controller: "auth",
            action: "login"
        }, user)

        const tokenResponse = await firstValueFrom(observable);
        console.log("Token Response:", tokenResponse);

        if (tokenResponse && tokenResponse.result && tokenResponse.result.token) {
            const accessToken = tokenResponse.result.token;
            localStorage.setItem("accessToken", accessToken);
            successCallBack();
        } else {
            console.error("Token response is invalid. Details:", tokenResponse);
        }

        successCallBack();
    }

    async refreshTokenLogin(refreshToken: string):Promise<any>{

        const observable: Observable<any | TokenResponse> = this.httpClientService.post({
            controller: "auth",
            action: "refreshtokenlogin"
        }, { refreshToken: refreshToken });


        const tokenResponse: TokenResponse = await firstValueFrom(observable);

        if (tokenResponse) {
            localStorage.setItem("accessToken", tokenResponse.token.accessToken);
            localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
            return true;
        } else {
            return false;
        }

    }
}