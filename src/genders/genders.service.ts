import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateGenderDto } from './dto/create-gender.dto';
import { Gender } from './entities/gender.entity';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class GendersService {
  constructor(
    @InjectRepository(Gender)
    private gendersRepository: Repository<Gender>,
  ) {}

  create(createGenderDto: CreateGenderDto): Promise<Gender> {
    return this.gendersRepository.save(
      this.gendersRepository.create(createGenderDto),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<Gender[]> {
    return this.gendersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Gender>): Promise<NullableType<Gender>> {
    return this.gendersRepository.findOne({
      where: fields,
    });
  }

  update(id: Gender['id'], payload: DeepPartial<Gender>): Promise<Gender> {
    return this.gendersRepository.save(
      this.gendersRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: Gender['id']): Promise<void> {
    await this.gendersRepository.softDelete(id);
  }
}
