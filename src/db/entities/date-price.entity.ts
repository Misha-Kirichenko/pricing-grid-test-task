import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { RoomCategory } from './room-category.entity';

@Entity('date_prices')
@Unique(['roomCategory', 'day'])
export class DatePrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  day: string;

  @Column({ type: 'numeric', nullable: false })
  price: number;

  @ManyToOne(() => RoomCategory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_ctg_id' })
  roomCategory: RoomCategory;
}
