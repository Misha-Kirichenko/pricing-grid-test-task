import { applyDecorators } from '@nestjs/common';
import { TAnyDecorator } from './types/any-decorator.type';

export const AbstractCreateDocs =
  (commonDecorators: TAnyDecorator[] = []) =>
  (endpointDecorators: TAnyDecorator[] = []) => {
    return applyDecorators(...commonDecorators, ...endpointDecorators);
  };
