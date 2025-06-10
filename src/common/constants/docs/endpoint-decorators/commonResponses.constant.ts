import { ApiBadRequestResponse } from '@nestjs/swagger';
import { MESSAGES } from '../../messages.constant';

export const COMMON_RESPONSES = [
  ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: MESSAGES.ERRORS.BAD_REQUEST,
        statusCode: 400,
      },
      description: 'Unexpected error',
    },
  }),
];
