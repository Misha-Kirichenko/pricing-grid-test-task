import { TPriceGrid } from 'src/common/types';
import { IDayOverride } from 'src/hotel-rates/interfaces/day-overide.interface';

export const getOverrideGrid = (
  foundData: IDayOverride[],
  baseGrid: TPriceGrid,
): TPriceGrid => {
  const override: TPriceGrid = {};
  for (const data of foundData) {
    const { category_name, day: date, price } = data;
    const categoryObj = baseGrid[category_name];
    const dateObj = categoryObj[date];
    if (!override[category_name]) {
      override[category_name] = { ...baseGrid[category_name] };
    }
    override[category_name][date] = {
      weekDay: dateObj.weekDay,
      price: Number(price),
    };
  }
  return override;
};
