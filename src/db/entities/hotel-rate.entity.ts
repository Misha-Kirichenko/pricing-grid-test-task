import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RoomCategoryRate } from './room-category-rate.entity';

@Entity()
export class HotelRate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column('varchar', { array: true, default: [] })
  tags: string[];

  @Column({ type: 'numeric', nullable: true })
  mon_price: number;

  @Column({ type: 'numeric', nullable: true })
  tue_price: number;

  @Column({ type: 'numeric', nullable: true })
  wed_price: number;

  @Column({ type: 'numeric', nullable: true })
  thu_price: number;

  @Column({ type: 'numeric', nullable: true })
  fri_price: number;

  @Column({ type: 'numeric', nullable: true })
  sat_price: number;

  @Column({ type: 'numeric', nullable: true })
  sun_price: number;

  @OneToMany(() => RoomCategoryRate, (roomCategoryRate) => roomCategoryRate.hotelRate)
  roomCategoryRates: RoomCategoryRate[];
}
