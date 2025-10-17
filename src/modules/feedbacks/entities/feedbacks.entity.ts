import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/root/entities/base.entity";
import { StoresEntity } from "../../stores/entities/stores.entity";
import { ScaleOptionEntity } from "./scale-option.entity";
import { FeedbackDetailEntity } from "./feedback-detail.entity";


@Entity('feedback_tbl')
export class FeedbacksEntity extends BaseEntity{
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("bigint", { name: "option_id" })
    optionId: number;

    @Column("bigint", { name: "region_id" })
    regionId: number;

    @Column("nvarchar", { name: "region_name"})
    regionName: string;

    @Column("varchar", { name: "store_code"})
    storeCode: string;

    @Column("varchar", { name: "phone_number", nullable: true })
    phoneNumber: string;

    @Column("date", { name: "rating_date", nullable: true })
    ratingDate: Date;

    @Column("nvarchar", { name: "content", nullable: true })
    content: string;

    @ManyToOne(() => StoresEntity, (store) => store.feedbacks)
    @JoinColumn({ name: "store_code", referencedColumnName: "code" })
    store: StoresEntity;

    @ManyToOne(() => ScaleOptionEntity, (t) => t.feedbacks)
    @JoinColumn({ name: "option_id" })
    scaleOption: ScaleOptionEntity;

    @OneToMany(()=> FeedbackDetailEntity, (t) => t.feedback)
    feedbackDetails: FeedbackDetailEntity[];
}