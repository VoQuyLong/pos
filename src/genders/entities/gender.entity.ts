import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityHelper } from '../../utils/entity-helper';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'gender' })
@Entity()
export class Gender extends EntityHelper {
  @Field(() => ID)
  @ApiProperty({ example: 1 })
  @PrimaryColumn()
  id: number;

  @Field()
  @Allow()
  @ApiProperty({ example: 'Male' })
  @Column()
  name?: string;
}
