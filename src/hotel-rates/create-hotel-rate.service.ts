import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHotelRatefDTO } from './dto/create-hotel-rate.dto';
import { MESSAGES } from 'src/common/constants/messages.constant';
import { RoomCategory, RatePrice, WeekPrice, HotelRate } from 'src/db/entities';
import { In, Repository } from 'typeorm';
import { messageUtil } from 'src/utils/message-util';
import { TFoundCategories } from './types/found-categories.type';
import { MultiStatusResponse } from 'src/common/responses/multi-status-response';
import { TCreatedRate } from './types/created-rate.type';

@Injectable()
export class CreateHotelRateService {
  constructor(
    @InjectRepository(HotelRate)
    private readonly hotelRateRepository: Repository<HotelRate>,
    @InjectRepository(RoomCategory)
    private readonly roomCategoryRepository: Repository<RoomCategory>,
  ) { }

  private async findRoomCategories(
    allCtgIds: string[],
  ): Promise<TFoundCategories> {
    const answer: TFoundCategories = {
      existingCtgIds: [],
      skippedCategories: [],
    };

    const foundCategories = await this.roomCategoryRepository.find({
      where: { id: In(allCtgIds) },
      select: ['id'],
    });

    if (!foundCategories.length) {
      throw new NotFoundException(
        messageUtil.ERRORS.notFound('Room categories'),
      );
    }

    const foundCategoriesIds = foundCategories.map((category) => category.id);

    if (foundCategoriesIds.length !== allCtgIds.length) {
      answer.skippedCategories = allCtgIds.filter(
        (id) => !foundCategoriesIds.includes(id),
      );
    }

    answer.existingCtgIds = foundCategoriesIds;

    return answer;
  }

  public async createHotelRate(
    createHotelRatefDTO: CreateHotelRatefDTO,
  ): Promise<TCreatedRate> {
    const { weekPrices, ...hotelRate } = createHotelRatefDTO;
    const allCtgIds = weekPrices.map((weekPrice) => weekPrice.room_ctg_id);

    const queryRunner =
      this.hotelRateRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const { existingCtgIds, skippedCategories } =
        await this.findRoomCategories(allCtgIds);

      const { identifiers } = await queryRunner.manager
        .getRepository(HotelRate)
        .insert(hotelRate);
      const [{ id: createdHotelRateId }] = identifiers as { id: string }[];

      const weekPricesWithExistingCtgs = weekPrices
        .filter((weekPrice) => existingCtgIds.includes(weekPrice.room_ctg_id))
        .map((weekPrice) => ({
          ...weekPrice,
          roomCategory: { id: weekPrice.room_ctg_id },
        }));

      const { identifiers: savedWeekPriceIds } = await queryRunner.manager
        .getRepository(WeekPrice)
        .insert(weekPricesWithExistingCtgs);

      const ratePrices = savedWeekPriceIds.map((weekPrice: { id: number }) => ({
        weekPrice: { id: weekPrice.id },
        hotelRate: { id: createdHotelRateId },
      }));

      await queryRunner.manager.getRepository(RatePrice).insert(ratePrices);

      await queryRunner.commitTransaction();

      const response = {
        message: skippedCategories.length
          ? MESSAGES.SUCCESS.HOTEL_RATE_PARTIAL
          : messageUtil.SUCCESS.created('Hotel rate'),
        skippedCategories: skippedCategories,
      };

      return skippedCategories.length
        ? new MultiStatusResponse(response)
        : response;
    } catch (error: unknown) {
      await queryRunner.rollbackTransaction();
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error['code'] === '23505' &&
        error['table'] === 'hotel_rates'
      ) {
        throw new ConflictException(
          messageUtil.ERRORS.exists(`Hotel rate with name '${hotelRate.name}'`),
        );
      }

      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error['code'] === '23505' &&
        error['table'] === 'week_prices'
      ) {
        throw new ConflictException(
          messageUtil.ERRORS.exists(`Week prices for some categories`),
        );
      }
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(MESSAGES.ERRORS.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }
}
