import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetFeedBackDto {
  @ApiPropertyOptional({ description: 'Số trang', example: '1' })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ description: 'Số item', example: '10' })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional({ description: 'Điểm', example: '5' })
  @IsOptional()
  @IsNumber()
  score?: number;
}
