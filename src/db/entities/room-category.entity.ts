import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WeekPrice } from './week-price.entity';

@Entity('room_categories')
export class RoomCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true, length: 255, unique: true })
  name: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => WeekPrice, (weekPrice: WeekPrice) => weekPrice.roomCategory)
  weekPrice: WeekPrice;
}
