import { WeekDays } from 'src/common/enums';
import { TPriceGrid } from 'src/common/types';
import { IDayOverride } from 'src/hotel-rates/interfaces/day-overide.interface';

export const getGridFromDatePrices = (
  foundData: IDayOverride[],
): TPriceGrid => {
  const grid: TPriceGrid = {};
  for (const data of foundData) {
    const { price, day, category_name } = data;
    const date = new Date(day);
    date.setHours(0, 0, 0, 0);
    const weekDay = WeekDays[date.getDay()];
    if (!grid[category_name]) {
      grid[category_name] = {};
    }
    grid[category_name][day] = {
      weekDay: weekDay as keyof WeekDays,
      price: Number(price),
    };
  }
  return grid;
};
