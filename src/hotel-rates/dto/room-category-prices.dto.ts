import { IsDefined, IsUUID } from 'class-validator';
import { WeekPricesDTO } from './week-prices.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RoomCategoryPricesDTO extends WeekPricesDTO {
  @ApiProperty({ example: 'e42cfdf2-c164-4b45-a19e-49844e9ef120' })
  @IsDefined()
  @IsUUID('4')
  room_ctg_id: string;
}
