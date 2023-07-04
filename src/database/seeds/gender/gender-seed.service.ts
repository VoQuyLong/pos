import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from 'src/genders/entities/gender.entity';
import { genders } from 'src/database/seeds/gender/gender.data';
import { Repository } from 'typeorm';

@Injectable()
export class GenderSeedService {
  constructor(
    @InjectRepository(Gender)
    private repository: Repository<Gender>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      const genderEntities = genders.map((gender) =>
        this.repository.create({
          id: gender.id,
          name: gender.name,
        }),
      );
      await this.repository.save(genderEntities);
    }
  }
}
