import { AbstractCreateDocs } from 'src/common/decorators/docs';
import { COMMON_RESPONSES } from 'src/common/constants/docs/endpoint-decorators/commonResponses.constant';

export const CreateDatePricesDocs = AbstractCreateDocs(COMMON_RESPONSES);
