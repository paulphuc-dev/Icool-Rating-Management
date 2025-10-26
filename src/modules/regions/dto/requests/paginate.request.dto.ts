import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginateRequestDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  storeName?: string;
}
