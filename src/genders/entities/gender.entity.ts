import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  Generated,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EntityHelper } from '../../utils/entity-helper';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'gender' })
@Entity()
export class Gender extends EntityHelper {
  @ApiProperty({ example: 1 })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @ApiProperty({ name: 'Male' })
  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  name: string | null;

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
