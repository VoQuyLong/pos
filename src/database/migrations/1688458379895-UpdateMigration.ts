import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1688458379895 implements MigrationInterface {
  name = 'Init1688458379895';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_0ad4792ebd254550ad4fdb55d6b\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`telecom_provider\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_0ad4792ebd254550ad4fdb55d6b\` FOREIGN KEY (\`providerId\`) REFERENCES \`telecom_provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_0ad4792ebd254550ad4fdb55d6b\``,
    );
    await queryRunner.query(`DROP TABLE \`telecom_provider\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_0ad4792ebd254550ad4fdb55d6b\` FOREIGN KEY (\`providerId\`) REFERENCES \`telecom_service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
