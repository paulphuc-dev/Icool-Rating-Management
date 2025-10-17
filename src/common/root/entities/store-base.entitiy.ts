import { Column } from "typeorm";

export abstract class StoreBaseEntity{
  @Column("bit")
  active: boolean;

  @Column("varchar", {name:"ref_code"})
  refCode: string;

  @Column("int", {name:"trangthai"})
  status: number;

  @Column("datetime", {name:"created_date"})
  createdDate: Date;

  @Column("varchar", {name:"created_by", length: 15})
  createdBy: string;

  @Column("datetime", {name:"modified_date"})
  modifiedDate: Date;

  @Column("varchar", {name:"modified_by", length: 15})
  modifiedBy: string;
}