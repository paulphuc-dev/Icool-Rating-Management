import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GroupManagerEntity } from './group-manager.entity';

@Entity('Groups_IC')
export class GroupICEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('nvarchar')
  name: string;

  @Column('varchar')
  code: string;

  @Column('nvarchar')
  permissions: string;

  @Column('bit')
  active: boolean;

  @Column('varchar', { name: 'created_by' })
  createdBy: string;

  @Column('datetime', { name: 'created_date' })
  createdDate: Date;

  @Column('varchar', { name: 'modified_by' })
  modifiedBy: string;

  @Column('datetime', { name: 'modified_date' })
  modifiedDate: Date;

  @OneToMany(() => GroupManagerEntity, (t) => t.groupIc)
  groupMangers: GroupManagerEntity[];
}
