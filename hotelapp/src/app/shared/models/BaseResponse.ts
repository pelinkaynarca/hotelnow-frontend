import { HttpStatusCode } from "@angular/common/http";

export class BaseResponse<T>{
    statusCode: HttpStatusCode;
    statusMessage: string;
    result:T;
}