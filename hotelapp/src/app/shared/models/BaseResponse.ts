export class BaseResponse<T>{
    statusCode: number;
    statusMessage: string;
    result:T;
}