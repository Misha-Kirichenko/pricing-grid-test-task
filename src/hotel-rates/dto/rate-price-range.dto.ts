import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsUUID } from 'class-validator';
import { DateRangeDTO } from 'src/common/dto/dateRange.dto';

export class RatePriceRangeDTO extends DateRangeDTO {
  @ApiProperty()
  @IsDefined()
  @IsUUID('4')
  rate_id: string;
}
