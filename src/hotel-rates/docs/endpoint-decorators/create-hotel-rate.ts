import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { messageUtil } from 'src/utils/message-util';
import {
  CREATE_HOTEL_RATE_PARTIAL_EXAMPLE,
  CREATE_HOTEL_RATE_EXAMPLE,
} from '../examples';

export const CREATE_HOTEL_RATE = [
  ApiCreatedResponse({
    schema: {
      example: CREATE_HOTEL_RATE_EXAMPLE,
    },
  }),
  ApiResponse({
    status: 207,
    description: 'Multi-Status: Partial success or multiple results.',
    schema: {
      example: CREATE_HOTEL_RATE_PARTIAL_EXAMPLE,
    },
  }),
  ApiNotFoundResponse({
    schema: {
      example: {
        statusCode: 404,
        message: messageUtil.ERRORS.notFound('Room categories'),
      },
    },
  }),
  ApiConflictResponse({
    schema: {
      example: {
        statusCode: 409,
        message: messageUtil.ERRORS.exists(
          `Hotel rate with name 'Family package'`,
        ),
      },
    },
  }),
];
