import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ScaleOptionEntity } from "./scale-option.entity";
import { BaseEntity } from "src/common/root/entities/base.entity";

@Entity("rating_survey_tbl")
export class SurveyEntity extends BaseEntity{
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column("nvarchar")
  title: string;

  @Column("tinyint", { name: "survey_type" })
  surveyType: number;

  @Column("tinyint", { name: "display_position" })
  displayPosition: number;

  @Column("tinyint", { name: "rating_scale" })
  ratingScale: number;

  @Column("nvarchar")
  description: string;

  @Column("tinyint")
  status: number;

  @OneToMany(() => ScaleOptionEntity, (t) => t.ratingSurvey)
  scaleOptions: ScaleOptionEntity[];
}

