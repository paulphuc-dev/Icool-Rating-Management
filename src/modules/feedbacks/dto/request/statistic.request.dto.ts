import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class StatisticRequestDto {
  @ApiPropertyOptional({ description: 'Mã khu vực', example: '1' })
  @IsOptional()
  @IsNumber()
  regionId?: number;

  @ApiPropertyOptional({ description: 'Mã cửa hàng', example: '1' })
  @IsOptional()
  @IsString()
  storeCode?: string;
}
