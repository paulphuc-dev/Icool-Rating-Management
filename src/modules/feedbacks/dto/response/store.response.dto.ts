import { Expose } from "class-transformer";

export class StoreResponseDto{

    @Expose()
    id: string;

    @Expose()
    code: string;

    @Expose()
    name: string;

    @Expose()
    address: string;
}