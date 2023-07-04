import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from 'src/genders/entities/gender.entity';
import { GenderSeedService } from './gender-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gender])],
  providers: [GenderSeedService],
  exports: [GenderSeedService],
})
export class GenderSeedModule {}
