/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CreateGenderDto } from './dto/create-gender.dto';
import { Gender } from './entities/gender.entity';
import { GendersService } from './genders.service';

@Resolver((of) => Gender)
export class GendersResolver {
  constructor(private readonly gendersService: GendersService) {}

  @Query((returns) => Gender)
  async gender(@Args('id') id: number): Promise<Gender> {
    const gender = await this.gendersService.findOne({ id: id });
    if (!gender) {
      throw new NotFoundException(id);
    }
    return gender;
  }

  @Query((returns) => [Gender])
  genders(
    @Args('page', { defaultValue: 1 }) page: number,
    @Args('limit', { defaultValue: 50 }) limit: number,
  ): Promise<Gender[]> {
    if (limit > 50) {
      limit = 50;
    }

    return this.gendersService.findManyWithPagination({
      page,
      limit,
    });
  }

  @Mutation((returns) => Gender)
  async addGender(
    @Args('newGenderData') newGenderData: CreateGenderDto,
  ): Promise<Gender> {
    const gender = await this.gendersService.create(newGenderData);
    return gender;
  }

  @Mutation((returns) => Boolean)
  async removeGender(@Args('id') id: number) {
    return this.gendersService.softDelete(id);
  }
}
