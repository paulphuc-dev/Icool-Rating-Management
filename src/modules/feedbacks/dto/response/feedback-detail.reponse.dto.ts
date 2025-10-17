import { Expose, Type } from "class-transformer";
import { DetailResponseDto } from "./detail.response.dto";

export class FeedbackDetailResponseDto {
  @Expose()
  @Type(() => DetailResponseDto)
  ratingDetail: DetailResponseDto[];
}