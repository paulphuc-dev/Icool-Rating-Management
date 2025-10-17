import { FeedbackResponseDto } from "../dto/response/feedback-response.dto";

export interface IPaginate{
    total: number;
    page: number;
    limit: number;
    data:  FeedbackResponseDto[];
} 