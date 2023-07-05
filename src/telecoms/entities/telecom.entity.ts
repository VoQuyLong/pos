import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'telecom_provider' })
@Entity()
export class TelecomProvider extends EntityHelper {
  @Field(() => ID)
  @ApiProperty({ example: 1 })
  @PrimaryColumn()
  id: number;

  @Field()
  @Allow()
  @ApiProperty({ example: 'VNPT' })
  @Column()
  name?: string;
}
