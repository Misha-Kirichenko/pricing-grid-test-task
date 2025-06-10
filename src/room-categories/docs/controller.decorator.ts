import { AbstractCreateDocs } from 'src/common/decorators/docs';
import { COMMON_RESPONSES } from 'src/common/constants/docs/endpoint-decorators/commonResponses.constant';
import { TAnyDecorator } from 'src/common/decorators/docs/types/any-decorator.type';

export const CreateRoomCategoriesDocs = (decorators: TAnyDecorator[] = []) =>
  AbstractCreateDocs(COMMON_RESPONSES)(decorators);
