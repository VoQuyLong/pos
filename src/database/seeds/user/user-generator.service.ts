import { User } from '../../../users/entities/user.entity';
import { faker } from '@faker-js/faker';
import { genders } from '../gender/gender.data';
import { telecomProviders } from '../telecom/telecom.data';
import { jobs } from '../job/job.data';
import { districts } from '../district/district.data';
import { Gender } from '../../../genders/entities/gender.entity';
import { Job } from '../../../jobs/entities/job.entity';
import { TelecomProvider } from '../../../telecoms/entities/telecom.entity';
import { District } from '../../../districts/entities/district.entity';

export class UserGenerator {
  private static randomIndex(
    source: Array<{ id: number; name: string }>,
  ): number {
    const index: number = faker.number.int({ min: 1, max: source.length - 1 });
    return index;
  }

  public static createRandomUser(): User {
    // Generate a random index
    const randomGenderIndex = UserGenerator.randomIndex(genders);
    const randomProviderIndex = UserGenerator.randomIndex(telecomProviders);
    const randomJobIndex = UserGenerator.randomIndex(jobs);
    const randomDistrictIndex = UserGenerator.randomIndex(districts);

    const user: User = new User();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.password = 'secret';
    user.role = 'client';
    user.status = 'active';
    user.createdAt = faker.date.past();
    user.updatedAt = faker.date.past();

    const gender: Gender = new Gender();
    gender.id = randomGenderIndex;
    gender.name = genders[randomGenderIndex].name;
    user.gender = gender;

    const job: Job = new Job();
    job.id = randomJobIndex;
    job.name = jobs[randomJobIndex].name;
    user.job = job;

    const provider: TelecomProvider = new TelecomProvider();
    provider.id = randomProviderIndex;
    provider.name = telecomProviders[randomProviderIndex].name;
    user.provider = provider;

    const address: District = new District();
    address.id = randomDistrictIndex;
    address.name = districts[randomDistrictIndex].name;
    user.address = address;

    return user;
  }

  public static generateUsers(count: number): User[] {
    const users: User[] = [];
    for (let i = 0; i < count; i++) {
      const user = UserGenerator.createRandomUser();
      users.push(user);
    }
    return users;
  }
}
