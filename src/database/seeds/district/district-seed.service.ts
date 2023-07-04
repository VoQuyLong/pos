import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from 'src/districts/entities/district.entity';
import { districts } from 'src/database/seeds/district/district.data';
import { Repository } from 'typeorm';

@Injectable()
export class DistrictSeedService {
  constructor(
    @InjectRepository(District)
    private repository: Repository<District>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      const districtEntities = districts.map((district) =>
        this.repository.create({
          id: district.id,
          name: district.name,
        }),
      );
      await this.repository.save(districtEntities);
    }
  }
}
