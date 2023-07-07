import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateGender1688695637624 implements MigrationInterface {
    name = 'UpdateGender1688695637624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`gender\` CHANGE \`name\` \`name\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`gender\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
    }

}
