import { IStoresResponse } from "./stores.interface.dto";

export interface IQrCode{
    id: number;
    storeId: number;
    code: string;
    name: string;
    note: string;
    qrcode: string;
    store: IStoresResponse;
}