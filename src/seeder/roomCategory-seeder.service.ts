import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoomCategory } from '../db/entities/room-category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomCategorySeeder {
  constructor(
    @InjectRepository(RoomCategory)
    private roomCategoryRepository: Repository<RoomCategory>,
  ) {}

  public async seed(): Promise<void> {
    const existing = await this.roomCategoryRepository.count();
    if (existing > 0) {
      console.warn(
        '[Room categories seeder]: room categories already exist, skipping seed.',
      );
      return;
    }

    const categories = [
      { name: 'Standard Room' },
      { name: 'Deluxe Room' },
      { name: 'Superior Room' },
      { name: 'Executive Suite' },
      { name: 'Presidential Suite' },
      { name: 'Family Room' },
      { name: 'Single Room' },
      { name: 'Double Room' },
      { name: 'Twin Room' },
    ];

    await this.roomCategoryRepository.save(categories);

    console.log('[Room categories seeder]: seeder was successfully executed.');
  }
}
