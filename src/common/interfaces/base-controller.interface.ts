import { PagingDTO } from '../dto';
import { IPagingData } from './paging-data.interface';

export interface IBaseController {
  findAll: (pagingDTO: PagingDTO) => Promise<IPagingData<unknown>>;
}
