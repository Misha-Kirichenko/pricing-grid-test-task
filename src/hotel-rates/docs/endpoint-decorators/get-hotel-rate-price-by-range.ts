import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { messageUtil } from 'src/utils/message-util';
import { HOTEL_RATE_PRICE_BY_RANGE_EXAMPLE } from '../examples';

export const GET_HOTEL_RATE_PRICE_BY_RANGE = [
  ApiOkResponse({
    schema: {
      example: HOTEL_RATE_PRICE_BY_RANGE_EXAMPLE,
    },
  }),
  ApiNotFoundResponse({
    schema: {
      example: {
        statusCode: 404,
        message: messageUtil.ERRORS.notFound('rate'),
      },
    },
  }),
];
