import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RoomCategoryPricesDTO } from './room-category-prices.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  HOTEL_RATE_TAGS_EXAMPLE,
  HOTEL_RATE_WEEK_PRICES_EXAMPLE,
} from '../docs/examples';

export class CreateHotelRatefDTO {
  @ApiProperty({ example: 'Family package' })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: HOTEL_RATE_TAGS_EXAMPLE })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({
    example: HOTEL_RATE_WEEK_PRICES_EXAMPLE,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomCategoryPricesDTO)
  weekPrices: RoomCategoryPricesDTO[];
}
