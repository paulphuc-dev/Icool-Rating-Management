import {
  IFlatRow,
  IRatingLevel,
  IData,
} from '../interfaces/statistic.interface';
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
