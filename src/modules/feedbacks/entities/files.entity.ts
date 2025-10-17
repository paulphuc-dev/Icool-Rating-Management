import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "src/common/root/entities/base.entity";
import { ScaleOptionEntity } from "./scale-option.entity";

@Entity("file_tbl")
export class FilesEntity extends BaseEntity{
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column("bigint", { name: "source_id" })
  sourceId: number;

  @Column("varchar", { name: "source_category" })
  sourceCategory: string;

  @Column("varchar", { name: "source_code" })
  sourceCode: string;

  @Column("nvarchar", { name: "original_name" })
  originalName: string;

  @Column("varchar", { name: "file_name" })
  fileName: string;

  @Column("varchar")
  path: string;

  @Column("varchar", { name: "thumb_path" })
  thumbPath: string;

  @Column("varchar")
  url: string;

  @Column("varchar", { name: "thumb_url" })
  thumbUrl: string;

  @Column("varchar")
  extension: string;

  @Column("bit", { default: false })
  drafted: boolean;

  @OneToOne(() => ScaleOptionEntity, t => t.emoji)
  @JoinColumn() 
  scaleOption: ScaleOptionEntity;
}
