import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { StoresEntity } from "./stores.entity";

@Entity("Regions")
export class RegionEntity{

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column("bigint",{name: 'store_id'})
    storeId: number;

    @Column("varchar")
    code: string

    @Column("nvarchar")
    name: string;

    @Column("nvarchar")
    note: string;

    @Column("bigint",{name: 'place_id'})
    placeId: number;

    @Column("bit")
    active: boolean;

    @Column("bit")
    deleted: boolean;

    @Column("int")
    status: number;

    @ManyToOne(() => StoresEntity, (t) => t.regions)
    @JoinColumn({ name: "store_id" })
    store: StoresEntity;
}