import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RatePrice } from './rate-price.pivot.entity';

@Entity('hotel_rates')
export class HotelRate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column('varchar', { array: true, default: [] })
  tags: string[];

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => RatePrice, (ratePrice) => ratePrice.hotelRate)
  roomCategoryRates: RatePrice[];
}
