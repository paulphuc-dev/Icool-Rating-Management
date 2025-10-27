import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import type { HttpResponse } from 'src/common/utils/response.util';
import {
  SurveysService,
  ISurvey,
  SwaggerDescription,
  StatusCode,
  getDataSuccessfully,
} from '../index';

@ApiTags('Surveys')
@Controller('surveys')
export class SurveysClientController {
  constructor(private readonly surveyService: SurveysService) {}

  @Get('/')
  @ApiOperation({ summary: SwaggerDescription.getAll })
  async getSurvey(@Query('star') star: number): HttpResponse<ISurvey | null> {
    const data = await this.surveyService.getSurvey(star);
    return {
      statusCode: StatusCode.OK,
      message: getDataSuccessfully,
      data,
    };
  }
}
