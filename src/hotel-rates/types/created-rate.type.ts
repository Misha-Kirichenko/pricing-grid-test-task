import { MultiStatusResponse } from 'src/common/responses/multi-status-response';
import { TCreateHotelRateAnswer } from './create-hotel-rate.type';

export type TCreatedRate =
  | TCreateHotelRateAnswer
  | MultiStatusResponse<TCreateHotelRateAnswer>;
