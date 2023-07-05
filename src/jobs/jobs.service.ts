import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.entity';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}

  create(createJobDto: CreateJobDto): Promise<Job> {
    return this.jobsRepository.save(this.jobsRepository.create(createJobDto));
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<Job[]> {
    return this.jobsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Job>): Promise<NullableType<Job>> {
    return this.jobsRepository.findOne({
      where: fields,
    });
  }

  update(id: Job['id'], payload: DeepPartial<Job>): Promise<Job> {
    return this.jobsRepository.save(
      this.jobsRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: Job['id']): Promise<void> {
    await this.jobsRepository.softDelete(id);
  }
}
