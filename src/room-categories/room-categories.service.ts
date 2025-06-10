import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MESSAGES } from 'src/common/constants/messages.constant';
import { PagingDTO } from 'src/common/dto';
import { IPagingData } from 'src/common/interfaces/paging-data.interface';
import { RoomCategory } from 'src/db/entities';
import { Repository } from 'typeorm';
import { IRoomCategory } from './interfaces/room-category.interface';

@Injectable()
export class RoomCategoriesService {
  constructor(
    @InjectRepository(RoomCategory)
    private readonly roomCategoryRepository: Repository<RoomCategory>,
  ) {}

  public async findAll(
    pagingDTO: PagingDTO,
  ): Promise<IPagingData<IRoomCategory>> {
    try {
      const { page = 1, limit = 10 } = pagingDTO;

      const total = await this.roomCategoryRepository.count({});

      const roomCategories = await this.roomCategoryRepository.find({
        select: ['id', 'name'],
        skip: (page - 1) * limit,
        take: limit,
        order: { createdAt: 'DESC' },
      });

      return { total, data: roomCategories };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(MESSAGES.ERRORS.BAD_REQUEST);
    }
  }
}
