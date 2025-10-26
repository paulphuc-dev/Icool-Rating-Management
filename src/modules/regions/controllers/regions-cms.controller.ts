import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import type { HttpResponse } from 'src/common/utils/response.util';
import { RegionsService } from '../regions.service';
import { StatusCode } from 'src/common/consts/http-code';
import { IQrCode } from '../interfaces/qrcode.interface';
import { SwaggerDescription } from '../consts/swagger-des.const';
import { getDataSuccessfully } from 'src/common/consts/message';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { PaginateRequestDto } from '../dto/requests/paginate.request.dto';

@ApiBearerAuth('Bearer')
@UseGuards(JwtAuthGuard)
@ApiTags('Regions')
@Controller('regions')
export class RegionsCMSController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get('/qrcode')
  @ApiOperation({ summary: SwaggerDescription.getData })
  async getQrCode(
    @Query() paginate: PaginateRequestDto,
  ): HttpResponse<IQrCode> {
    const data = await this.regionsService.getQRCodes(paginate);
    return {
      statusCode: StatusCode.OK,
      message: getDataSuccessfully,
      data,
    };
  }
}
