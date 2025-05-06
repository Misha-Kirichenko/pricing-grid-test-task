import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { RoomCategory } from './room-category.entity';
import { HotelRate } from './hotel-rate.entity';

@Entity('room_category_rates')
@Unique(['roomCategory', 'hotelRate'])
export class RoomCategoryRate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RoomCategory, (roomCategory) => roomCategory.roomCategoryRates, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'room_ctg_id' })
  roomCategory: RoomCategory;

  @ManyToOne(() => HotelRate, (hotelRate) => hotelRate.roomCategoryRates, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'rate_id' })
  hotelRate: HotelRate;
}
