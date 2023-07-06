import { NestFactory } from '@nestjs/core';
import { JobSeedService } from './job/job-seed.service';
import { SeedModule } from './seed.module';
import { GenderSeedService } from './gender/gender-seed.service';
import { DistrictSeedService } from './district/district-seed.service';
import { TelecomProviderSeedService } from './telecom/telecom-seed.service';
import { UserSeedService } from './user/user-seed.service';

const isTestEnvironment = process.env.NODE_ENV == 'test';
const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(JobSeedService).run();
  await app.get(GenderSeedService).run();
  await app.get(DistrictSeedService).run();
  await app.get(TelecomProviderSeedService).run();
  await app.get(UserSeedService).run(isTestEnvironment);
  await app.close();
};

void runSeed();
