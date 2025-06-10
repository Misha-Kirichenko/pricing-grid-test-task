import { Module } from '@nestjs/common';
import { RoomCategoriesController } from './room-categories.controller';
import { RoomCategoriesService } from './room-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomCategory } from 'src/db/entities';

@Module({
  imports: [TypeOrmModule.forFeature([RoomCategory])],
  controllers: [RoomCategoriesController],
  providers: [RoomCategoriesService],
})
export class RoomCategoriesModule {}
