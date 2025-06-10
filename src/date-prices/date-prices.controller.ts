import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { DatePricesService } from './date-prices.service';
import { DayPriceDTO } from './dto/datePrice.dto';
import { TResponseMessage } from 'src/common/types';
import { ApiTags } from '@nestjs/swagger';
import { CreateDatePricesDocs } from './docs/controller.decorator';
import { UPDATE_OR_CREATE_DATE_PRICE } from './docs/endpoint-decorators/update-or-create-date-price';

@ApiTags('Date prices')
@Controller('date-prices')
export class DatePricesController {
  constructor(private readonly datePriceService: DatePricesService) { }

  @CreateDatePricesDocs(UPDATE_OR_CREATE_DATE_PRICE)
  @Patch('/:category_id')
  updateOrCreateDatePrice(
    @Param('category_id', new ParseUUIDPipe()) category_id: string,
    @Body() createDatePriceDTO: DayPriceDTO,
  ): Promise<TResponseMessage> {
    return this.datePriceService.updateOrCreateDayPrice(
      category_id,
      createDatePriceDTO,
    );
  }
}
