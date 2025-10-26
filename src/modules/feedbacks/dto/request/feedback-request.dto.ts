import { IsNumber, IsString, IsArray, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FeedbackDto {
  @ApiProperty()
  @IsNumber()
  regionId: number;

  @ApiProperty()
  @IsString()
  regionName: string;

  @ApiProperty()
  @IsString()
  storeCode: string;

  @ApiProperty()
  @IsNumber()
  optionId: number;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  ratingDate: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty({ message: 'Phải chọn ít nhất 1 gợi ý đánh giá' })
  @Type(() => Number)
  suggestionIds: number[];
}
