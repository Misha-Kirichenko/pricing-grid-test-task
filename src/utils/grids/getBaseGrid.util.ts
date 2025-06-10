import { TDatesObj } from 'src/common/types';
import { TPriceGrid } from 'src/common/types/price-grid.type';
import { TBasePriceItem } from 'src/hotel-rates/types/basePriceItem.type';

export const getBaseGrid = (
  baseData: TBasePriceItem[],
  datesObj: TDatesObj,
): TPriceGrid => {
  const baseGrid: TPriceGrid = {};
  for (const date in datesObj) {
    const weekDay = datesObj[date];
    for (const data of baseData) {
      if (!baseGrid[data.category_name]) {
        baseGrid[data.category_name] = {};
      }
      baseGrid[data.category_name][date] = {
        weekDay,
        price: Number(data[weekDay]),
      };
    }
  }
  return baseGrid;
};
