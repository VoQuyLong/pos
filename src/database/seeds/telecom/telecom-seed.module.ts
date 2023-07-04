import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelecomProvider } from 'src/telecoms/entities/telecom.entity';
import { TelecomProviderSeedService } from './telecom-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([TelecomProvider])],
  providers: [TelecomProviderSeedService],
  exports: [TelecomProviderSeedService],
})
export class TelecomSeedModule {}
