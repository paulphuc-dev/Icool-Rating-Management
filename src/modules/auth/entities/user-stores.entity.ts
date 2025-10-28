import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { StoresEntity } from 'src/modules/stores/entities/stores.entity';

@Entity('NhanVien_CuaHang')
export class UserStoresEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'user_id' })
  userId: string;

  @Column('varchar', { name: 'cuahang_id' })
  storeId: string;

  @Column('tinyint', { name: 'is_manager' })
  isManager: number;

  @Column('varchar', { name: 'created_by' })
  createdBy: string;

  @Column('datetime', { name: 'created_date' })
  createdDate: Date;

  @Column('varchar', { name: 'modified_by' })
  modifiedBy: string;

  @Column('datetime', { name: 'modified_date' })
  modifiedDate: Date;

  @Column()
  status: number;

  @ManyToOne(() => UsersEntity, (t) => t.userStores)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'code' })
  manager: UsersEntity;

  @ManyToOne(() => StoresEntity, (t) => t.userStores)
  @JoinColumn({ name: 'cuahang_id', referencedColumnName: 'code' })
  store: StoresEntity;
}
