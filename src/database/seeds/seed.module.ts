import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'src/config/app.config';
import databaseConfig from 'src/config/database.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from '../typeorm-config.service';
import { UserSeedModule } from './user/user-seed.module';
import { JobSeedModule } from './job/job-seed.module';
import { TelecomSeedModule } from './telecom/telecom-seed.module';
import { GenderSeedModule } from './gender/gender-seed.module';
import { DistrictSeedModule } from './district/district-seed.module';

@Module({
  imports: [
    GenderSeedModule,
    TelecomSeedModule,
    JobSeedModule,
    UserSeedModule,
    DistrictSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
})
export class SeedModule {}
