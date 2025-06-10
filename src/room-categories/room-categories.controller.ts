import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomCategoriesService } from './room-categories.service';
import { PagingDTO } from 'src/common/dto';
import { IPagingData } from 'src/common/interfaces/paging-data.interface';
import { IRoomCategory } from './interfaces/room-category.interface';
import { IBaseController } from 'src/common/interfaces/base-controller.interface';
import { CreateRoomCategoriesDocs } from './docs/controller.decorator';
import { FIND_ALL } from './docs/endpoint-decorators';

@ApiTags('Room categories')
@Controller('room-categories')
export class RoomCategoriesController implements IBaseController {
  constructor(private roomCategoryService: RoomCategoriesService) {}

  @CreateRoomCategoriesDocs(FIND_ALL)
  @Get()
  findAll(@Query() pagingDTO: PagingDTO): Promise<IPagingData<IRoomCategory>> {
    return this.roomCategoryService.findAll(pagingDTO);
  }
}
