import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, Min } from 'class-validator';
import { IsDateOnly } from 'src/common/decorators/validation';

export class DayPriceDTO {
  @ApiProperty({ example: '2025-04-18' })
  @IsDefined()
  @IsDateOnly({ message: 'Day must be in YYYY-MM-DD format' })
  day: string;

  @ApiProperty({ example: 999.99 })
  @IsDefined()
  @IsNumber({ allowNaN: false })
  @Min(1)
  price: number;
}
