import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsersEntity } from './users.entity';
import { GroupICEntity } from './group-ic.entity';

@Entity('Groups_Managers_IC')
export class GroupManagerEntity {
  @PrimaryColumn({ name: 'manager_id', type: 'uuid' })
  managerId: string;

  @PrimaryColumn({ name: 'group_id', type: 'uuid' })
  groupId: string;

  @ManyToOne(() => UsersEntity, (t) => t.groupMangers)
  @JoinColumn({ name: 'manager_id' })
  manager: UsersEntity;

  @ManyToOne(() => GroupICEntity, (t) => t.groupMangers)
  @JoinColumn({ name: 'group_id' })
  groupIc: GroupICEntity;
}
