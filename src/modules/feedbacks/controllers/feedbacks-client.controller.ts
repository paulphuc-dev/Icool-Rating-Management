import { Controller, Post, Body} from '@nestjs/common';
import { ApiTags, ApiOperation} from '@nestjs/swagger';
import { SwaggerDescription } from '../consts/swagger-des.const';
import { FeedbackDto } from '../dto/request/feedback-request.dto';
import type { HttpResponse} from 'src/common/utils/response';
import { StatusCode } from 'src/common/consts/http-code';
import { FeedbacksService } from '../feedbacks.service';
import { IFeedback } from '../interfaces/feedback.interface';
import { createdSuccessfully} from 'src/common/consts/message';

@ApiTags("Feedbacks")
@Controller('feedbacks')
export class FeedbacksClientController {
    
    constructor(private readonly feedbackService: FeedbacksService){}

    @Post('/')
    @ApiOperation({ summary: SwaggerDescription.post })
    async createFeedback(@Body() feedback: FeedbackDto): HttpResponse<IFeedback>{
        
        const data = await this.feedbackService.createFeedback(feedback)
        return {
            statusCode: StatusCode.CREATED,
            message: createdSuccessfully,
            data,
        };
    }
}
