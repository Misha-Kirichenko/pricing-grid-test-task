import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { HotelRate } from './hotel-rate.entity';
import { RoomCategory } from './room-category.entity';

@Entity('date_prices')
@Unique(['roomCategory', 'rate', 'day'])
export class DatePrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  day: Date;

  @Column({ type: 'numeric', nullable: false })
  price: number;

  @ManyToOne(() => HotelRate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rate_id' })
  rate: HotelRate;

  @ManyToOne(() => RoomCategory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_ctg_id' })
  roomCategory: RoomCategory;
}
