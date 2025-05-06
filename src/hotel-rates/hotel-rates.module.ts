import { Module } from '@nestjs/common';
import { HotelRatesController } from './hotel-rates.controller';
import { HotelRatesService } from './hotel-rates.service';

@Module({
  controllers: [HotelRatesController],
  providers: [HotelRatesService]
})
export class HotelRatesModule { }
