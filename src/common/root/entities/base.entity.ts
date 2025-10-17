import { Column } from "typeorm";
export abstract class BaseEntity{
    @Column("bit", { default: true })
    active: boolean;

    @Column({ type: "datetime", name: "created_at", default: () => "GETDATE()" })
    createdAt: Date;

    @Column("varchar", { name: "created_by", nullable: true })
    createdBy: string;

    @Column({ type: "datetime", name: "updated_at", nullable: true })
    updatedAt?: Date;

    @Column("varchar", { name: "updated_by", nullable: true })
    updatedBy: string;

    @Column({ type: "datetime", name: "deleted_at", nullable: true })
    deletedAt?: Date;

    @Column("varchar", { name: "deleted_by", nullable: true })
    deletedBy: string;

    @Column("bit", { name: "delete_flag", default: false })
    deleteFlag: boolean;
}
