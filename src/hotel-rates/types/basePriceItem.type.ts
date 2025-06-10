import { WeekDays } from 'src/common/enums';

type WeekDayKeys = Exclude<keyof typeof WeekDays, `${number}`>;

export type TBasePriceItem = {
  [key in WeekDayKeys]: number;
} & {
  ctg_id: number;
  category_name: string;
  tags: string[];
  rate_name: string;
};
