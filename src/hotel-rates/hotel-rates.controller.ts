import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateHotelRateService } from './create-hotel-rate.service';
import { RatePriceRangeDTO, CreateHotelRatefDTO } from './dto';
import { HotelRatesService } from './hotel-rates.service';
import { TfinalPricesGrid, TCreatedRate } from './types';
import { PagingDTO } from 'src/common/dto';
import { IPagingData } from 'src/common/interfaces/paging-data.interface';
import { IHotelRate } from './interfaces/hotel-rate.interface';
import { CreateHotelRateDocs } from './docs/controller.decorator';
import {
  CREATE_HOTEL_RATE,
  FIND_ALL,
  GET_HOTEL_RATE_PRICE_BY_RANGE,
} from './docs/endpoint-decorators';
import { ApiTags } from '@nestjs/swagger';
import { IBaseController } from 'src/common/interfaces/base-controller.interface';

@ApiTags('Hotel rates')
@Controller('hotel-rates')
export class HotelRatesController implements IBaseController {
  constructor(
    private readonly createHotelRateService: CreateHotelRateService,
    private readonly hotelRateService: HotelRatesService,
  ) { }

  @CreateHotelRateDocs(FIND_ALL)
  @Get()
  findAll(@Query() pagindDTO: PagingDTO): Promise<IPagingData<IHotelRate>> {
    return this.hotelRateService.findAll(pagindDTO);
  }

  @CreateHotelRateDocs(CREATE_HOTEL_RATE)
  @Post()
  createHotelRate(
    @Body() createHotelRatefDTO: CreateHotelRatefDTO,
  ): Promise<TCreatedRate> {
    return this.createHotelRateService.createHotelRate(createHotelRatefDTO);
  }

  @CreateHotelRateDocs(GET_HOTEL_RATE_PRICE_BY_RANGE)
  @Get('/:rate_id/:dateFrom/:dateTo')
  getHotelRatePriceByRange(
    @Param() ratePriceRangeDTO: RatePriceRangeDTO,
  ): Promise<TfinalPricesGrid> {
    return this.hotelRateService.getHotelRatePriceByRange(ratePriceRangeDTO);
  }
}
