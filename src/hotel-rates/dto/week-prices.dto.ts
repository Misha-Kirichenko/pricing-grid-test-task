import { IsDefined, IsNumber, Min } from 'class-validator';

export class WeekPricesDTO {
  @IsDefined()
  @IsNumber({ allowNaN: false })
  @Min(1)
  mon: number;

  @IsDefined()
  @IsNumber({ allowNaN: false })
  @Min(1)
  tue: number;

  @IsDefined()
  @IsNumber()
  @Min(1)
  wed: number;

  @IsDefined()
  @IsNumber({ allowNaN: false })
  @Min(1)
  thu: number;

  @IsDefined()
  @IsNumber({ allowNaN: false })
  @Min(1)
  fri: number;

  @IsDefined()
  @IsNumber({ allowNaN: false })
  @Min(1)
  sat: number;

  @IsDefined()
  @IsNumber({ allowNaN: false })
  @Min(1)
  sun: number;
}
