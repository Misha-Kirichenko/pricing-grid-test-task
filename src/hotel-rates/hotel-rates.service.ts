import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { RatePriceRangeDTO } from './dto/rate-price-range.dto';
import { MESSAGES } from 'src/common/constants/messages.constant';
import { InjectRepository } from '@nestjs/typeorm';
import { DatePrice, HotelRate, RatePrice } from 'src/db/entities';
import { Repository } from 'typeorm';
import {
  generateDatesObj,
  getBaseGrid,
  getGridFromDatePrices,
  getOverrideGrid,
} from 'src/utils/grids';
import { IDayOverride } from './interfaces/day-overide.interface';
import { TfinalPricesGrid, TBasePriceItem } from './types';
import { messageUtil } from 'src/utils/message-util';
import { PagingDTO } from 'src/common/dto';
import { IPagingData } from 'src/common/interfaces/paging-data.interface';
import { IHotelRate } from './interfaces/hotel-rate.interface';

@Injectable()
export class HotelRatesService {
  constructor(
    @InjectRepository(DatePrice)
    private readonly datePriceRepository: Repository<DatePrice>,
    @InjectRepository(RatePrice)
    private readonly ratePriceRepository: Repository<RatePrice>,
    @InjectRepository(HotelRate)
    private readonly hotelRateRepository: Repository<HotelRate>,
  ) {}

  public async findAll(pagingDTO: PagingDTO): Promise<IPagingData<IHotelRate>> {
    try {
      const { page = 1, limit = 10 } = pagingDTO;

      const total = await this.hotelRateRepository.count({});

      const hotelRates = await this.hotelRateRepository.find({
        select: ['id', 'name', 'tags'],
        skip: (page - 1) * limit,
        take: limit,
        order: { createdAt: 'DESC' },
      });

      return { total, data: hotelRates };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(MESSAGES.ERRORS.BAD_REQUEST);
    }
  }

  public async getHotelRatePriceByRange(
    ratePriceRangeDTO: RatePriceRangeDTO,
  ): Promise<TfinalPricesGrid> {
    const pricesFinalGrid = {};
    try {
      const { dateFrom, dateTo, rate_id } = ratePriceRangeDTO;
      const datesObj = generateDatesObj(dateFrom, dateTo);
      const basePriceItems: TBasePriceItem[] = await this.ratePriceRepository
        .createQueryBuilder('ratePrice')
        .innerJoin('ratePrice.weekPrice', 'weekprice')
        .innerJoin('weekprice.roomCategory', 'room_ctg')
        .innerJoin('ratePrice.hotelRate', 'hotelrate')
        .where('ratePrice.hotelRate = :rate_id', { rate_id })
        .select([
          'weekprice.mon AS mon',
          'weekprice.tue AS tue',
          'weekprice.wed AS wed',
          'weekprice.thu AS thu',
          'weekprice.fri AS fri',
          'weekprice.sat AS sat',
          'weekprice.sun AS sun',
          'weekprice.room_ctg_id AS ctg_id',
          'room_ctg.name AS category_name',
          'hotelrate.name AS rate_name',
          'hotelrate.tags AS tags',
        ])
        .getRawMany();

      if (!basePriceItems.length) {
        throw new BadRequestException(messageUtil.ERRORS.notFound('rate'));
      }

      const [basePriceItem] = basePriceItems;
      pricesFinalGrid['rate_name'] = basePriceItem.rate_name;
      pricesFinalGrid['tags'] = basePriceItem.tags;

      const roomCtgIds = basePriceItems.map((item) => item.ctg_id);

      const overrideDatePrices: IDayOverride[] = await this.datePriceRepository
        .createQueryBuilder('dayPrice')
        .innerJoin('dayPrice.roomCategory', 'room_ctg')
        .select([
          `TO_CHAR(dayPrice.day, 'YYYY-MM-DD') AS day`,
          'dayPrice.price AS price',
          'dayPrice.room_ctg_id AS room_ctg_id',
          'room_ctg.name AS category_name',
        ])
        .where('room_ctg.id IN (:...ids)', { ids: roomCtgIds })
        .andWhere('dayPrice.day BETWEEN :from AND :to', {
          from: dateFrom,
          to: dateTo,
        })
        .orderBy('dayPrice.day', 'ASC')
        .getRawMany();

      if (Object.keys(datesObj).length === overrideDatePrices.length) {
        pricesFinalGrid['data'] = getGridFromDatePrices(overrideDatePrices);
      } else {
        const baseGrid = getBaseGrid(basePriceItems, datesObj);
        if (overrideDatePrices.length) {
          const overridePricesGrid = getOverrideGrid(
            overrideDatePrices,
            baseGrid,
          );
          pricesFinalGrid['data'] = overridePricesGrid;
        } else {
          pricesFinalGrid['data'] = baseGrid;
        }
      }

      return pricesFinalGrid as TfinalPricesGrid;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(MESSAGES.ERRORS.BAD_REQUEST);
    }
  }
}
