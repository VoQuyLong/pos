/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => User)
  async user(@Args('id') id: number): Promise<User> {
    const user = await this.usersService.findOne({ id: id });
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query((returns) => [User])
  users(
    @Args('page', { defaultValue: 1 }) page: number,
    @Args('limit', { defaultValue: 50 }) limit: number,
  ): Promise<User[]> {
    if (limit > 50) {
      limit = 50;
    }

    return this.usersService.findManyWithPagination({
      page,
      limit,
    });
  }

  @Mutation((returns) => User)
  async addUser(
    @Args('newUserData') newUserData: CreateUserDto,
  ): Promise<User> {
    const user = await this.usersService.create(newUserData);
    return user;
  }

  @Mutation((returns) => Boolean)
  async removeUser(@Args('id') id: number) {
    return this.usersService.softDelete(id);
  }
}
