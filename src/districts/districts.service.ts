import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateDistrictDto } from './dto/create-district.dto';
import { District } from './entities/district.entity';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District)
    private districtsRepository: Repository<District>,
  ) {}

  create(createDistrictDto: CreateDistrictDto): Promise<District> {
    return this.districtsRepository.save(
      this.districtsRepository.create(createDistrictDto),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<District[]> {
    return this.districtsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<District>): Promise<NullableType<District>> {
    return this.districtsRepository.findOne({
      where: fields,
    });
  }

  update(
    id: District['id'],
    payload: DeepPartial<District>,
  ): Promise<District> {
    return this.districtsRepository.save(
      this.districtsRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: District['id']): Promise<void> {
    await this.districtsRepository.softDelete(id);
  }
}
