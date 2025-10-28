import { Expose, Type } from 'class-transformer';
import { RatingDetailDto } from 'src/modules/surveys/dto/response/detail.reponse.dto';

export class FeedbackDetailResponseDto {
  @Expose()
  @Type(() => RatingDetailDto)
  ratingDetail: RatingDetailDto[];
}
