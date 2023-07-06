import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../users/entities/user.entity';
import { UserGenerator } from './user-generator.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async run(isTestEnvironment: boolean) {
    const countAdmin = await this.repository.count({
      where: {
        role: 'admin',
      },
    });

    if (!countAdmin) {
      const adminUser = this.repository.create({
        firstName: 'Long',
        lastName: 'VQ',
        email: 'long@example.com',
        password: 'secret',
        role: 'admin',
        status: 'active',
      });
      await this.repository.save(adminUser);
    }

    const countUser = await this.repository.count({
      where: {
        role: 'client',
      },
    });

    if (!countUser) {
      const userCount = isTestEnvironment ? 1 : 500;
      const users: User[] = UserGenerator.generateUsers(userCount);
      for (const user of users) {
        await this.repository.save(user);
      }
    }
  }
}
