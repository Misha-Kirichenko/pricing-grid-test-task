import { WeekDays } from '../enums';

export type TDatesObj = {
  [key: string]: keyof WeekDays;
};
