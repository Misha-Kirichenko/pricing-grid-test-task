import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { HotelRate } from './hotel-rate.entity';
import { WeekPrice } from './week-price.entity';

@Entity('rate_prices')
@Unique(['hotelRate', 'weekPrice'])
export class RatePrice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => HotelRate, (hotelRate) => hotelRate.roomCategoryRates, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'rate_id' })
  hotelRate: HotelRate;

  @ManyToOne(() => WeekPrice, (weekPrice) => weekPrice.roomRates, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'week_prices_id' })
  weekPrice: WeekPrice;
}
