import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '../../../jobs/entities/job.entity';
import { JobSeedService } from './job-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  providers: [JobSeedService],
  exports: [JobSeedService],
})
export class JobSeedModule {}
