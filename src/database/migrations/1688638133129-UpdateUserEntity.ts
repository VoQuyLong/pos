import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserEntity1688638133129 implements MigrationInterface {
  name = 'UpdateUserEntity1688638133129';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
    );
  }
}
