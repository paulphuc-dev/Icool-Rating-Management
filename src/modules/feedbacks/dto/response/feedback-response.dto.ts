import { Expose, Type } from 'class-transformer';
import { FeedbackDetailResponseDto } from './feedback-detail.reponse.dto';
import { StoresResponseDto } from 'src/modules/stores/dto/store-response.dto';
import { OptionResponseDto } from 'src/modules/surveys/dto/response/option-response.dto';

export class FeedbackResponseDto {
  @Expose()
  id: string;

  @Expose()
  regionId: number;

  @Expose()
  regionName: string;

  @Expose()
  phoneNumber?: string;

  @Expose()
  ratingDate?: Date;

  @Expose()
  content?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  createdBy?: string;

  @Expose()
  processStatus: string;

  @Expose()
  @Type(() => StoresResponseDto)
  store: StoresResponseDto;

  @Expose()
  @Type(() => OptionResponseDto)
  scaleOption: OptionResponseDto;

  @Expose()
  @Type(() => FeedbackDetailResponseDto)
  feedbackDetails: FeedbackDetailResponseDto[];
}
