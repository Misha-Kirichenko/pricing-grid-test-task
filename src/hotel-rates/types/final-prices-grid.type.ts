import { TPriceGrid } from 'src/common/types';
import { TBasePriceItem } from './basePriceItem.type';

export type TfinalPricesGrid = Pick<TBasePriceItem, 'rate_name' | 'tags'> & {
  data: TPriceGrid;
};
