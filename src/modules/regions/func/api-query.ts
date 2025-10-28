import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiQuery, getSchemaPath } from '@nestjs/swagger';
import { ReferenceObject } from 'openapi3-ts/oas30';

export function ApiQueryDto<T>(dto: Type<T>, name = 'filter'): MethodDecorator {
  const schemaRef: ReferenceObject = { $ref: getSchemaPath(dto) };

  const queryOptions = {
    name,
    required: false,
    style: 'deepObject' as const,
    explode: true,
    schema: schemaRef,
  };

  return applyDecorators(
    ApiExtraModels(dto),
    ApiQuery(queryOptions),
  ) as MethodDecorator;
}
