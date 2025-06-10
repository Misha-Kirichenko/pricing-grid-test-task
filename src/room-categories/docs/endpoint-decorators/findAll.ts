import { ApiOkResponse } from '@nestjs/swagger';
import { ALL_ROOM_CATEGORIES_EXAMPLE } from '../examples';

export const FIND_ALL = [
  ApiOkResponse({
    schema: {
      example: ALL_ROOM_CATEGORIES_EXAMPLE,
    },
  }),
];
