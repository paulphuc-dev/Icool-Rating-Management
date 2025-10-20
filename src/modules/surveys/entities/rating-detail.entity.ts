import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { BaseEntity } from "src/common/root/entities/base.entity"
import { CategoryEntity } from "./categories.entity";
import { ScaleOptionEntity } from "src/modules/surveys/entities/scale-option.entity";
import { FeedbackDetailEntity } from "../../feedbacks/entities/feedback-detail.entity";

@Entity("rating_detail_tbl")
export class RatingDetailEntity extends BaseEntity{
    @PrimaryGeneratedColumn("increment", { type: "bigint" })
    id: number;

    @Column("nvarchar")
    title: string; 

    @Column("bigint",{name: "rating_category_id"})
    ratingCategoryId: number;

    @Column("bigint", {name: "rating_scale_options_id"})
    ratingScaleOptionsId: number;

    @Column("tinyint")
    status: number;

    @Column("nvarchar")
    description: string;

    @ManyToOne(() => CategoryEntity, (t) => t.ratingDetails)
    @JoinColumn({ name: "rating_category_id" })
    ratingCategory: CategoryEntity;

    @ManyToOne(() => ScaleOptionEntity, (t) => t.ratingDetail)
    @JoinColumn({ name: "rating_scale_options_id" })
    scaleOption: ScaleOptionEntity

    @OneToMany(()=> FeedbackDetailEntity, (t) => t.ratingDetail)
    feedbackDetails: FeedbackDetailEntity[];

}