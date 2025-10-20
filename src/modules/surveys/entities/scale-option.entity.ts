import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  OneToMany,
  OneToOne, 
  JoinColumn } from "typeorm";
import { BaseEntity } from "src/common/root/entities/base.entity";
import { RatingDetailEntity } from "./rating-detail.entity";
import { FilesEntity } from "./files.entity";
import { SurveyEntity } from "src/modules/surveys/entities/survey.entity";
import { FeedbacksEntity } from "src/modules/feedbacks/entities/feedbacks.entity";

@Entity("rating_scale_option_tbl")
export class ScaleOptionEntity extends BaseEntity{
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column("bigint", { name: "rating_survey_id" })
  ratingSurveyId: number;

  @Column("tinyint", { name: "score_value" })
  scoreValue: number;

  @Column("nvarchar")
  title: string;

  @Column("nvarchar")
  description: string;

  @Column("tinyint")
  status: number

  @ManyToOne(() => SurveyEntity, (t) => t.scaleOptions)
  @JoinColumn({ name: "rating_survey_id" })
  ratingSurvey: SurveyEntity;

  @OneToMany(()=>RatingDetailEntity, (t) => t.scaleOption)
  ratingDetail: RatingDetailEntity[];

  @OneToOne(() => FilesEntity, f => f.scaleOption)
  emoji: FilesEntity;

  @OneToMany(()=> FeedbacksEntity, (t) => t.scaleOption)
  feedbacks: FeedbacksEntity[];

}

