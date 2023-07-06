import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from '../../../districts/entities/district.entity';
import { DistrictSeedService } from './district-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([District])],
  providers: [DistrictSeedService],
  exports: [DistrictSeedService],
})
export class DistrictSeedModule {}
