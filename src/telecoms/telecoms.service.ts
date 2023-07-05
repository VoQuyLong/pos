import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateTelecomProviderDto } from './dto/create-telecom.dto';
import { TelecomProvider } from './entities/telecom.entity';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class TelecomsService {
  constructor(
    @InjectRepository(TelecomProvider)
    private telecomsRepository: Repository<TelecomProvider>,
  ) {}

  create(
    createTelecomProviderDto: CreateTelecomProviderDto,
  ): Promise<TelecomProvider> {
    return this.telecomsRepository.save(
      this.telecomsRepository.create(createTelecomProviderDto),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<TelecomProvider[]> {
    return this.telecomsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(
    fields: EntityCondition<TelecomProvider>,
  ): Promise<NullableType<TelecomProvider>> {
    return this.telecomsRepository.findOne({
      where: fields,
    });
  }

  update(
    id: TelecomProvider['id'],
    payload: DeepPartial<TelecomProvider>,
  ): Promise<TelecomProvider> {
    return this.telecomsRepository.save(
      this.telecomsRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: TelecomProvider['id']): Promise<void> {
    await this.telecomsRepository.softDelete(id);
  }
}
