import { ApiOkResponse } from '@nestjs/swagger';
import { ALL_HOTEL_RATES_EXAMPLE } from '../examples';

export const FIND_ALL = [
  ApiOkResponse({
    schema: {
      example: ALL_HOTEL_RATES_EXAMPLE,
    },
  }),
];
