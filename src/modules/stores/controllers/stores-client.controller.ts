import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import type { HttpResponse } from 'src/common/utils/response.util';
import {
  StoresService,
  IResponse,
  SwaggerDescription,
  StatusCode,
  getDataSuccessfully,
} from '../index';

@ApiTags('Stores')
@Controller('stores')
export class StoresClientController {
  constructor(private readonly storesService: StoresService) {}

  @Get('/')
  @ApiOperation({ summary: SwaggerDescription.getAll })
  async getStores(): HttpResponse<IResponse> {
    const data = await this.storesService.getStores();
    return {
      statusCode: StatusCode.OK,
      message: getDataSuccessfully,
      data,
    };
  }
}
