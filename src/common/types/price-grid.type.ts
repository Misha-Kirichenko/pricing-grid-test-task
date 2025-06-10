import { WeekDays } from '../enums';

export type TPriceGrid = Record<
  string,
  Record<string, { weekDay: keyof WeekDays; price: number }>
>;
