import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/jobs/entities/job.entity';
import { jobs } from 'src/database/seeds/job/job.data';
import { Repository } from 'typeorm';

@Injectable()
export class JobSeedService {
  constructor(
    @InjectRepository(Job)
    private repository: Repository<Job>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      const jobEntities = jobs.map((job) =>
        this.repository.create({
          id: job.id,
          name: job.name,
        }),
      );

      await this.repository.save(jobEntities);
    }
  }
}
