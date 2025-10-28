import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/root/entities/base.entity';
import { RatingDetailEntity } from './rating-detail.entity';

@Entity('rating_category_tbl')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column('nvarchar')
  title: string;

  @Column('nvarchar')
  description: string;

  @Column('tinyint')
  status: number;

  @OneToMany(() => RatingDetailEntity, (t) => t.ratingCategory)
  ratingDetails: RatingDetailEntity[];
}
