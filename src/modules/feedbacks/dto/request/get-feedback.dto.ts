import { IsNumber, IsString, IsOptional, IsIn } from 'class-validator';
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

  @ApiPropertyOptional({
    description: 'Tên cửa hàng',
    example: 'Icool Xô Viết Nghệ Tĩnh',
  })
  @IsOptional()
  @IsString()
  store?: string;

  @ApiPropertyOptional({
    description: 'Trạng thái',
    example: 'resolved',
    enum: ['pending', 'resolved'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['pending', 'resolved'])
  status?: string;
}
