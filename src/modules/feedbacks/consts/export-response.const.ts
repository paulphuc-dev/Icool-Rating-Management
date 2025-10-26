import { StatusCode } from 'src/common/consts/http-code';
import { SwaggerDescription } from './swagger-des.const';

export const exportResponse = {
  status: StatusCode.OK,
  description: SwaggerDescription.getExport,
  content: {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
      schema: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};
