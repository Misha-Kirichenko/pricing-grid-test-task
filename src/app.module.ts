import { Module } from '@nestjs/common';
import { HotelRatesModule } from './hotel-rates/hotel-rates.module';
import { CONFIG } from './db/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RoomCategory } from './db/entities/room-category.entity';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...CONFIG,
      username: CONFIG.user,
      type: 'postgres',
      autoLoadEntities: false,
      synchronize: true, // Set to true only in development
      logging: true,
      entities: [join(__dirname, 'db/entities', '*.entity{.ts,.js}')],
    }),
    TypeOrmModule.forFeature([RoomCategory]),
    HotelRatesModule,
    SeederModule,
  ],
})
export class AppModule { }
