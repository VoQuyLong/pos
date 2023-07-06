import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityHelper } from '../../utils/entity-helper';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'job' })
@Entity()
export class Job extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryColumn()
  @Field(() => ID)
  id: number;

  @Field()
  @Allow()
  @ApiProperty({ example: 'IT' })
  @Column()
  name?: string;
}
