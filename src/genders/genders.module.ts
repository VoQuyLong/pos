import { Module } from '@nestjs/common';
import { GendersService } from './genders.service';
import { GendersResolver } from './genders.resolver';
import { GenderController } from './genders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { IsExist } from '../utils/validators/is-exists.validator';
import { IsNotExist } from '../utils/validators/is-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Gender])],
  controllers: [GenderController],
  providers: [IsExist, IsNotExist, GendersService, GendersResolver],
  exports: [GendersService],
})
export class GenderModule {}
