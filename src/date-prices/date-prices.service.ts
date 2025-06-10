import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MESSAGES } from 'src/common/constants/messages.constant';
import { DatePrice, RoomCategory } from 'src/db/entities';
import { messageUtil } from 'src/utils/message-util';
import { Repository } from 'typeorm';
import { DayPriceDTO } from './dto/datePrice.dto';
import { TResponseMessage } from 'src/common/types';

@Injectable()
export class DatePricesService {
  constructor(
    @InjectRepository(DatePrice)
    private readonly datePriceRepository: Repository<DatePrice>,
    @InjectRepository(RoomCategory)
    private readonly roomCategoryRepository: Repository<RoomCategory>,
  ) {}

  public async updateOrCreateDayPrice(
    category_id: string,
    createDatePriceDTO: DayPriceDTO,
  ): Promise<TResponseMessage> {
    try {
      const foundCategory = await this.roomCategoryRepository.findOne({
        where: { id: category_id },
        select: ['name'],
      });

      if (!foundCategory) {
        throw new NotFoundException(messageUtil.ERRORS.notFound('Category'));
      }
      const { day, price } = createDatePriceDTO;
      const foundDayPrice = await this.datePriceRepository.findOne({
        where: {
          day,
          roomCategory: { id: category_id },
        },
        relations: ['roomCategory'],
      });

      if (foundDayPrice) {
        foundDayPrice.price = price;
        await this.datePriceRepository.save(foundDayPrice);
      } else {
        const newDatePrice = {
          roomCategory: { id: category_id },
          price,
          day,
        };
        await this.datePriceRepository.save(newDatePrice);
      }
      return { message: messageUtil.SUCCESS.updated(`Day price`) };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(MESSAGES.ERRORS.BAD_REQUEST);
    }
  }
}
