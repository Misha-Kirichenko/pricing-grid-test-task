import { Module } from '@nestjs/common';
import { HotelRatesController } from './hotel-rates.controller';
import { CreateHotelRateService } from './create-hotel-rate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  HotelRate,
  RoomCategory,
  RatePrice,
  WeekPrice,
  DatePrice,
} from 'src/db/entities';
import { HotelRatesService } from './hotel-rates.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HotelRate,
      RoomCategory,
      RatePrice,
      WeekPrice,
      DatePrice,
    ]),
  ],
  controllers: [HotelRatesController],
  providers: [CreateHotelRateService, HotelRatesService],
})
export class HotelRatesModule { }
