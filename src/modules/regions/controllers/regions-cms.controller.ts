import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiExtraModels,
} from '@nestjs/swagger';
import type { HttpResponse } from 'src/common/utils/response.util';
import {
  RegionsService,
  GetRegionDto,
  IQrCode,
  SwaggerDescription,
  ApiQueryDto,
  JwtAuthGuard,
  StatusCode,
  getDataSuccessfully,
} from '../index';

@ApiBearerAuth('Bearer')
@UseGuards(JwtAuthGuard)
@ApiTags('Regions')
@ApiExtraModels(GetRegionDto)
@Controller('regions')
export class RegionsCMSController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get('/qrcode')
  @ApiQueryDto(GetRegionDto)
  @ApiOperation({ summary: SwaggerDescription.getData })
  async getQrCode(@Query() paginate: GetRegionDto): HttpResponse<IQrCode> {
    const data = await this.regionsService.getQRCodes(paginate);
    return {
      statusCode: StatusCode.OK,
      message: getDataSuccessfully,
      data,
    };
  }
}
