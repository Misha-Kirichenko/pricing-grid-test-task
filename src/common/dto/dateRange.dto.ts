import { IsDefined } from 'class-validator';
import { IsDateRangeValid } from '../decorators/validation';
import { ApiProperty } from '@nestjs/swagger';

@IsDateRangeValid({ message: 'Invalid date range' })
export class DateRangeDTO {
  @ApiProperty({ example: '2025-04-01' })
  @IsDefined()
  dateFrom: string;

  @ApiProperty({ example: '2025-04-25' })
  @IsDefined()
  dateTo: string;
}
