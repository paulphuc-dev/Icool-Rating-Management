import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import type { HttpResponse } from 'src/common/utils/response.util';
import {
  SwaggerDescription,
  FeedbackDto,
  StatusCode,
  FeedbacksService,
  IFeedback,
  createdSuccessfully,
} from '../index';

@ApiTags('Feedbacks')
@Controller('feedbacks')
export class FeedbacksClientController {
  constructor(private readonly feedbackService: FeedbacksService) {}

  @Post('/')
  @ApiOperation({ summary: SwaggerDescription.post })
  @ApiBody({ type: FeedbackDto })
  async createFeedback(@Body() feedback: FeedbackDto): HttpResponse<IFeedback> {
    const data = await this.feedbackService.createFeedback(feedback);
    return {
      statusCode: StatusCode.CREATED,
      message: createdSuccessfully,
      data,
    };
  }
}
