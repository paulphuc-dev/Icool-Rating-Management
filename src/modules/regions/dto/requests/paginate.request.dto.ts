import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetRegionDto {
  @ApiPropertyOptional({ description: 'Số trang', example: '1' })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Số item', example: '1' })
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Tên cửa hàng',
    example: 'Icool Xô Viết Nghệ Tĩnh',
  })
  @IsString()
  @IsOptional()
  storeName?: string;
}
