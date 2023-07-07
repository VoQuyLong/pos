import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  SerializeOptions,
} from '@nestjs/common';
import { TelecomsService } from './telecoms.service';
import { CreateTelecomProviderDto } from './dto/create-telecom.dto';
import { UpdateTelecomProviderDto } from './dto/update-telecom.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { infinityPagination } from '../utils/infinity-pagination';
import { TelecomProvider } from './entities/telecom.entity';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { NullableType } from '../utils/types/nullable.type';

@ApiBearerAuth()
@Roles('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Telecoms')
@Controller({
  path: 'telecoms',
  version: '1',
})
export class TelecomController {
  constructor(private readonly telecomsService: TelecomsService) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createProfileDto: CreateTelecomProviderDto,
  ): Promise<TelecomProvider> {
    return this.telecomsService.create(createProfileDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<InfinityPaginationResultType<TelecomProvider>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.telecomsService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NullableType<TelecomProvider>> {
    return this.telecomsService.findOne({ id: id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTelecomProviderDto: UpdateTelecomProviderDto,
  ): Promise<TelecomProvider> {
    return this.telecomsService.update(id, updateTelecomProviderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.telecomsService.softDelete(id);
  }
}
