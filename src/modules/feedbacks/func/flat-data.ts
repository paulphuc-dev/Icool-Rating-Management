import {
  IFlatRow,
  IRatingLevel,
  IData,
} from '../interfaces/statistic.interface';
import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiQuery, getSchemaPath } from '@nestjs/swagger';
import { ReferenceObject } from 'openapi3-ts/oas30';

export function groupByLabel(data: IFlatRow[]): IData[] {
  const map = new Map<string, { values: IRatingLevel[]; total: number }>();

  for (const row of data) {
    const { label, star, quantity } = row;

    if (!map.has(label)) {
      map.set(label, { values: [], total: 0 });
    }

    const entry = map.get(label)!;
    entry.values.push({ star, quantity });
    entry.total += quantity;
  }

  return Array.from(map.entries()).map(([label, { values, total }]) => ({
    label,
    values,
    ratingTotal: total,
  }));
}

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
