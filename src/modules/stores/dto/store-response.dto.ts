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
    createdDate: string;
}