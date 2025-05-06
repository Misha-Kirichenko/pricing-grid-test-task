import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RoomCategoryRate } from './room-category-rate.entity';

@Entity()
export class RoomCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true, length: 255, unique: true })
  name: string;

  @OneToMany(() => RoomCategoryRate, (roomCategoryRate) => roomCategoryRate.roomCategory)
  roomCategoryRates: RoomCategoryRate[];
}
