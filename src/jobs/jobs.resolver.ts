/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.entity';
import { JobsService } from './jobs.service';

@Resolver((of) => Job)
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query((returns) => Job)
  async job(@Args('id') id: number): Promise<Job> {
    const job = await this.jobsService.findOne({ id: id });
    if (!job) {
      throw new NotFoundException(id);
    }
    return job;
  }

  @Query((returns) => [Job])
  jobs(
    @Args('page', { defaultValue: 1 }) page: number,
    @Args('limit', { defaultValue: 50 }) limit: number,
  ): Promise<Job[]> {
    if (limit > 50) {
      limit = 50;
    }

    return this.jobsService.findManyWithPagination({
      page,
      limit,
    });
  }

  @Mutation((returns) => Job)
  async addJob(@Args('newJobData') newJobData: CreateJobDto): Promise<Job> {
    const job = await this.jobsService.create(newJobData);
    return job;
  }

  @Mutation((returns) => Boolean)
  async removeJob(@Args('id') id: number) {
    return this.jobsService.softDelete(id);
  }
}
