import {
  Column,
  AfterLoad,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Job } from '../../jobs/entities/job.entity';
import { Gender } from '../../genders/entities/gender.entity';
import { TelecomProvider } from '../../telecoms/entities/telecom.entity';
import { District } from '../../districts/entities/district.entity';
import { EntityHelper } from '../../utils/entity-helper';
import { Exclude, Expose } from 'class-transformer';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({ description: 'user' })
export class User extends EntityHelper {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ type: 'varchar', unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Field({ nullable: true })
  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Field({ nullable: true })
  @Index()
  @Column({ type: 'varchar', nullable: true })
  firstName: string | null;

  @Field({ nullable: true })
  @Index()
  @Column({ type: 'varchar', nullable: true })
  lastName: string | null;

  @Field()
  @Column({ type: 'varchar', nullable: false })
  role: string;

  @Field(() => Gender, { nullable: true })
  @ManyToOne(() => Gender, {
    eager: true,
    nullable: true,
  })
  gender: Gender | null;

  @Field(() => Job, { nullable: true })
  @ManyToOne(() => Job, {
    eager: true,
    nullable: true,
  })
  job: Job | null;

  @Field(() => TelecomProvider, { nullable: true })
  @ManyToOne(() => TelecomProvider, {
    eager: true,
    nullable: true,
  })
  provider: TelecomProvider | null;

  @Field(() => District, { nullable: true })
  @ManyToOne(() => District, {
    eager: true,
    nullable: true,
  })
  address: District | null;

  @Field()
  @Column({ type: 'varchar', nullable: false })
  status: string | null;

  @Column({ type: 'varchar', nullable: true })
  @Index()
  @Exclude({ toPlainOnly: true })
  hash: string | null;

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
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;
}
