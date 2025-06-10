import { TFoundCategories } from './found-categories.type';

export type TCreateHotelRateAnswer = Pick<
  TFoundCategories,
  'skippedCategories'
> & { message: string };
