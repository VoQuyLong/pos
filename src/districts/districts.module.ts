import { Module } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { DistrictsResolver } from './districts.resolver';
import { DistrictController } from './districts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from './entities/district.entity';
import { IsExist } from '../utils/validators/is-exists.validator';
import { IsNotExist } from '../utils/validators/is-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([District])],
  controllers: [DistrictController],
  providers: [IsExist, IsNotExist, DistrictsService, DistrictsResolver],
  exports: [DistrictsService],
})
export class DistrictModule {}
