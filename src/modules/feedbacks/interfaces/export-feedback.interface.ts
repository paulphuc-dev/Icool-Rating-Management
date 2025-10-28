export interface IExportFeedback {
  id: string;
  regionId: number;
  regionName: string;
  phoneNumber: string;
  storeName: string;
  scoreValue: number;
  content: string;
  ratingDate: Date;
  ratingDetailTitles: string[];
}
