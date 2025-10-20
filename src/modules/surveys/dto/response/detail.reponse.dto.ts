import { Expose } from "class-transformer";

export class RatingDetailDto{

    @Expose()
    id: number;

    @Expose()
    title: string;

}