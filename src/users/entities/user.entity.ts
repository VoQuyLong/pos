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
import { Job } from 'src/jobs/entities/job.entity';
import { Gender } from 'src/genders/entities/gender.entity';
import { TelecomProvider } from 'src/telecoms/entities/telecom.entity';
import { District } from 'src/districts/entities/district.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

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

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @Column({ type: String, nullable: false })
  role?: string;

  @ManyToOne(() => Gender, {
    eager: true,
  })
  gender?: Gender | null;

  @ManyToOne(() => Job, {
    eager: true,
  })
  job?: Job | null;

  @ManyToOne(() => TelecomProvider, {
    eager: true,
  })
  provider?: TelecomProvider | null;

  @ManyToOne(() => District, {
    eager: true,
  })
  address?: District | null;

  @Column({ type: String, nullable: false })
  status?: string | null;

  @Column({ type: String, nullable: true })
  @Index()
  @Exclude({ toPlainOnly: true })
  hash: string | null;

  @Column({
    default: () => 'NOW()',
  })
  createdAt: Date;

  @Column({
    default: () => 'NOW()',
  })
  updatedAt: Date;

  @Column({
    default: () => 'NOW()',
  })
  deletedAt: Date;
}
