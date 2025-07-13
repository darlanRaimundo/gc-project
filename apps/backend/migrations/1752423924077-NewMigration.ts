import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1752423924077 implements MigrationInterface {
    name = 'NewMigration1752423924077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`games\` ADD \`appid\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`games\` ADD \`provider\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`games\` ADD \`header_image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`games\` DROP COLUMN \`categoria\``);
        await queryRunner.query(`ALTER TABLE \`games\` ADD \`categoria\` json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`games\` DROP COLUMN \`categoria\``);
        await queryRunner.query(`ALTER TABLE \`games\` ADD \`categoria\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`games\` DROP COLUMN \`header_image\``);
        await queryRunner.query(`ALTER TABLE \`games\` DROP COLUMN \`provider\``);
        await queryRunner.query(`ALTER TABLE \`games\` DROP COLUMN \`appid\``);
    }

}
