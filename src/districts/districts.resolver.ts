/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CreateDistrictDto } from './dto/create-district.dto';
import { District } from './entities/district.entity';
import { DistrictsService } from './districts.service';

@Resolver((of) => District)
export class DistrictsResolver {
  constructor(private readonly districtsService: DistrictsService) {}

  @Query((returns) => District)
  async district(@Args('id') id: number): Promise<District> {
    const district = await this.districtsService.findOne({ id: id });
    if (!district) {
      throw new NotFoundException(id);
    }
    return district;
  }

  @Query((returns) => [District])
  districts(
    @Args('page', { defaultValue: 1 }) page: number,
    @Args('limit', { defaultValue: 50 }) limit: number,
  ): Promise<District[]> {
    if (limit > 50) {
      limit = 50;
    }

    return this.districtsService.findManyWithPagination({
      page,
      limit,
    });
  }

  @Mutation((returns) => District)
  async addDistrict(
    @Args('newDistrictData') newDistrictData: CreateDistrictDto,
  ): Promise<District> {
    const district = await this.districtsService.create(newDistrictData);
    return district;
  }

  @Mutation((returns) => Boolean)
  async removeDistrict(@Args('id') id: number) {
    return this.districtsService.softDelete(id);
  }
}
