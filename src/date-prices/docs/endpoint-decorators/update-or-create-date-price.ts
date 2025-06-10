import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { messageUtil } from 'src/utils/message-util';

export const UPDATE_OR_CREATE_DATE_PRICE = [
  ApiOkResponse({
    schema: {
      example: {
        message: messageUtil.SUCCESS.updated(`Day price`),
      },
    },
  }),
  ApiNotFoundResponse({
    schema: {
      example: {
        statusCode: 404,
        message: messageUtil.ERRORS.notFound('Category'),
      },
    },
  }),
];
