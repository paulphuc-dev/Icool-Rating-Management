import { Request } from 'express';
export interface IPayload {
  access_token: string;
  username: string;
  name: string;
  permissions: string[];
  storeIds: string[];
}

export interface IUserPayload {
  permissions: string[];
  storeIds: string[];
}

export interface AuthenticatedRequest extends Request {
  user: IUserPayload;
}
