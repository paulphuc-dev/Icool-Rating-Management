import { Expose, Type } from "class-transformer";
import { FileResponseDto } from "./file-response.dto";
import { RatingDetailDto } from "./detail.reponse.dto";

export class OptionResponseDto{

    @Expose()
    id: number;
    
    @Expose()
    scoreValue: number;

    @Expose()
    title: string;

    @Expose()
    @Type(() => FileResponseDto)
    emoji: FileResponseDto;

    @Expose({ name: 'ratingDetail' })
    @Type(()=> RatingDetailDto)
    detail: RatingDetailDto[];
}