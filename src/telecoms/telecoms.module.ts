import { Module } from '@nestjs/common';
import { TelecomsService } from './telecoms.service';
import { TelecomsResolver } from './telecoms.resolver';
import { TelecomController } from './telecoms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelecomProvider } from './entities/telecom.entity';
import { IsExist } from '../utils/validators/is-exists.validator';
import { IsNotExist } from '../utils/validators/is-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([TelecomProvider])],
  controllers: [TelecomController],
  providers: [IsExist, IsNotExist, TelecomsService, TelecomsResolver],
  exports: [TelecomsService],
})
export class TelecomModule {}
