import { Summary } from '../enums/descriptions';
import { StatisticRequestDto } from '../dto/request/statistic.request.dto';
import { GetFeedBackDto } from '../dto/request/get-feedback.dto';

export const SwaggerDescription = {
  getAll: Summary.GET_DETAIL_SUMMARY,

  post: Summary.POST_SUMMARY,

  getStatistic: Summary.GET_STATISTIC,

  getExport: Summary.GET_EXPORT,
};

export const extraModels = [GetFeedBackDto, StatisticRequestDto] as const;
