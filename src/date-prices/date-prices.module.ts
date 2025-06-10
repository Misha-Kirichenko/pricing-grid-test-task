import { Module } from '@nestjs/common';
import { DatePricesController } from './date-prices.controller';
import { DatePricesService } from './date-prices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatePrice, RoomCategory } from 'src/db/entities';

@Module({
  imports: [TypeOrmModule.forFeature([RoomCategory, DatePrice])],
  controllers: [DatePricesController],
  providers: [DatePricesService],
})
export class DatePricesModule {}
