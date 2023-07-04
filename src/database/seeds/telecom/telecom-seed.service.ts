import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TelecomProvider } from 'src/telecoms/entities/telecom.entity';
import { telecomProviders } from 'src/database/seeds/telecom/telecom.data';
import { Repository } from 'typeorm';

@Injectable()
export class TelecomProviderSeedService {
  constructor(
    @InjectRepository(TelecomProvider)
    private repository: Repository<TelecomProvider>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      const telecomEntities = telecomProviders.map((provider) =>
        this.repository.create({
          id: provider.id,
          name: provider.name,
        }),
      );

      await this.repository.save(telecomEntities);
    }
  }
}
