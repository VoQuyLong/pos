/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CreateTelecomProviderDto } from './dto/create-telecom.dto';
import { TelecomProvider } from './entities/telecom.entity';
import { TelecomsService } from './telecoms.service';

@Resolver(() => TelecomProvider)
export class TelecomsResolver {
  constructor(private readonly telecomsService: TelecomsService) {}

  @Query((returns) => TelecomProvider)
  async telecom(@Args('id') id: number): Promise<TelecomProvider> {
    const telecom = await this.telecomsService.findOne({ id: id });
    if (!telecom) {
      throw new NotFoundException(id);
    }
    return telecom;
  }

  @Query((returns) => [TelecomProvider])
  telecoms(
    @Args('page', { defaultValue: 1 }) page: number,
    @Args('limit', { defaultValue: 50 }) limit: number,
  ): Promise<TelecomProvider[]> {
    if (limit > 50) {
      limit = 50;
    }

    return this.telecomsService.findManyWithPagination({
      page,
      limit,
    });
  }

  @Mutation((returns) => TelecomProvider)
  async addTelecom(
    @Args('newTelecomData') newTelecomData: CreateTelecomProviderDto,
  ): Promise<TelecomProvider> {
    const telecom = await this.telecomsService.create(newTelecomData);
    return telecom;
  }

  @Mutation((returns) => Boolean)
  async removeTelecom(@Args('id') id: number) {
    return this.telecomsService.softDelete(id);
  }
}
