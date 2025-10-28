import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RegionEntity } from './regions.entity';

@Entity('Stores')
export class StoresEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('varchar')
  code: string;

  @Column('nvarchar')
  name: string;

  @Column('nvarchar')
  address: string;

  @Column('varchar')
  phone: string;

  @Column('nvarchar')
  note: string;

  @Column('bit')
  active: boolean;

  @Column('bit')
  deleted: boolean;

  @Column('varchar')
  refcode: string;

  @OneToMany(() => RegionEntity, (t) => t.store)
  regions: RegionEntity[];
}
