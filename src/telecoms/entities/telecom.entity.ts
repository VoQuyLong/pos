import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityHelper } from '../../utils/entity-helper';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'telecom_provider' })
@Entity()
export class TelecomProvider extends EntityHelper {
  @Field(() => ID)
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Allow()
  @ApiProperty({ example: 'VNPT' })
  @Column()
  name?: string;

  @Field()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Field()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Field()
  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;
}
