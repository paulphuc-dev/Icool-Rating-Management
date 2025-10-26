export interface ISuccessType<T> {
  statusCode: number;
  message: string;
  data: T | T[];
}

export interface IErrorType {
  errorCode: number;
  errorMessage: string;
}

export type HttpResponse<T> = Promise<ISuccessType<T> | IErrorType>;
