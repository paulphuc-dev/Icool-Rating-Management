import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { ISurvey } from './interfaces/ISurvey.interface';
import type { HttpResponse } from 'src/common/utils/response';
import { SurveysService } from './surveys.service';
import { StatusCode } from 'src/common/consts/http-code';
import { getDataSuccessfully } from 'src/common/consts/message';
import { SwaggerDescription } from './consts/swagger-des.const';

@ApiTags('Surveys')
@Controller('surveys')
export class SurveysController {
    constructor(private readonly surveyService: SurveysService){}

    @Get('/')
    @ApiOperation({ summary: SwaggerDescription.getAll })
    async getSurvey(@Query('star') star: number): HttpResponse<ISurvey | null>{
        const data = await this.surveyService.getSurvey(star);
        return {
            statusCode: StatusCode.OK,
            message: getDataSuccessfully,
            data,
        }
    }
}
