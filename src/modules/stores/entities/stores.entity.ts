import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { LocBaseEntity } from "src/common/root/entities/loc-base.entitiy";
import { FeedbacksEntity } from "../../feedbacks/entities/feedbacks.entity";
import { UserStoresEntity } from "src/modules/auth/entities/user-stores.entity";
@Entity("cuahang")
export class StoresEntity extends LocBaseEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { unique: true })
  code: string;

  @Column("nvarchar")
  name: string;

  @Column("nvarchar")
  address: string;

  @Column("varchar")
  tel: string;

  @Column("varchar", {name:"tinh"})
  province: string;

  @Column("varchar", {name:"quan"})
  district: string;

  @Column("varchar")
  abbr: string;
  
  @Column("varchar", {name:"lat"})
  latitude: string;

  @Column("varchar", {name:"lng"})
  longtitude: string;

  @Column("nvarchar")
  flag: string;

  @Column("varchar", {name:"ref_code"})
  refCode: string;

  @OneToMany(()=> FeedbacksEntity, (t) => t.store)
  feedbacks: FeedbacksEntity[];

  @OneToMany(()=> UserStoresEntity, (t) => t.store)
  userStores: UserStoresEntity[];

}