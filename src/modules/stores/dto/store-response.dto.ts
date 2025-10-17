import { Expose } from "class-transformer";

export class StoresResponseDto{

    @Expose()
    id: string;

    @Expose()
    code: string;

    @Expose()
    name: string;

    @Expose()
    address: string;

    @Expose()
    district: string;

    @Expose()
    tel: string;

    @Expose()
    createdDate: string;

    @Expose()
    createdBy: string;
}