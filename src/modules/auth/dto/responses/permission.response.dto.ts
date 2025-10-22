import { Expose } from "class-transformer";

export class PermissionResponseDto{

    @Expose()
    code: string;

    @Expose()
    name: string
}