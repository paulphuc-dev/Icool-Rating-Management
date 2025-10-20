import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "src/common/root/entities/base.entity";
import { FeedbacksEntity } from "./feedbacks.entity";
import { RatingDetailEntity } from "../../surveys/entities/rating-detail.entity";

@Entity("feedback_detail_tbl")
export class FeedbackDetailEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("uuid", {name: "feedback_id"})
    feedbackId: string;

    @Column("bigint", {name: "detail_id"})
    detailId: number;

    @ManyToOne(() => FeedbacksEntity, (t) => t.feedbackDetails)
    @JoinColumn({ name: "feedback_id" })
    feedback: FeedbacksEntity;

    @ManyToOne(() => RatingDetailEntity, (t) => t.feedbackDetails)
    @JoinColumn({ name: "detail_id" })
    ratingDetail: RatingDetailEntity;
}