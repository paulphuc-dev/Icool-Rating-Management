export interface IFlatRow {
  label: string;
  star: number;
  quantity: number;
}

export interface IRatingLevel {
  star: number;
  quantity: number;
}

export interface IData {
  ratingTotal: number;
  label: string;
  values: IRatingLevel[];
}

export interface IStatistic {
  statisticData: IData[];
}
