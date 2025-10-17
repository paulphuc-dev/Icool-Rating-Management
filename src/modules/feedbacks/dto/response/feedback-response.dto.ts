import { Expose, Type } from "class-transformer";
import { StoreResponseDto } from "./store.response.dto";
import { OptionResponseDto } from "./option.response.dto";
import { FeedbackDetailResponseDto } from "./feedback-detail.reponse.dto";

export class FeedbackResponseDto {

  @Expose()
  id: string;

  @Expose()
  optionId: number;

  @Expose()
  regionId: number;

  @Expose()
  regionName: string;

  /*@Expose()
  storeCode: string;*/

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
  @Type(()=> StoreResponseDto)
  store: StoreResponseDto;

  @Expose()
  @Type(() => OptionResponseDto)
  scaleOption: OptionResponseDto;
  
  @Expose()
  @Type(() => FeedbackDetailResponseDto)
  feedbackDetails: FeedbackDetailResponseDto;
}
