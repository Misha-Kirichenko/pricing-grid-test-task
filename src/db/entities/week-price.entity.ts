import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { RoomCategory } from './room-category.entity';
import { RatePrice } from './rate-price.pivot.entity';

@Entity('week_prices')
@Unique(['roomCategory'])
export class WeekPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', nullable: false })
  mon: number;

  @Column({ type: 'numeric', nullable: false })
  tue: number;

  @Column({ type: 'numeric', nullable: false })
  wed: number;

  @Column({ type: 'numeric', nullable: false })
  thu: number;

  @Column({ type: 'numeric', nullable: false })
  fri: number;

  @Column({ type: 'numeric', nullable: false })
  sat: number;

  @Column({ type: 'numeric', nullable: false })
  sun: number;

  @OneToOne(() => RoomCategory, (roomCategory) => roomCategory.weekPrice, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'room_ctg_id' })
  roomCategory: RoomCategory;

  @OneToMany(() => RatePrice, (ratePrice) => ratePrice.weekPrice)
  roomRates: RatePrice[];
}
