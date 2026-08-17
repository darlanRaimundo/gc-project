import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1752423924077 implements MigrationInterface {
  name = 'NewMigration1752423924077';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasColumn('games', 'appid'))) {
      await queryRunner.query(`ALTER TABLE \`games\` ADD \`appid\` int NULL`);
    }

    if (!(await queryRunner.hasColumn('games', 'provider'))) {
      await queryRunner.query(`ALTER TABLE \`games\` ADD \`provider\` varchar(255) NULL`);
    }

    if (!(await queryRunner.hasColumn('games', 'header_image'))) {
      await queryRunner.query(`ALTER TABLE \`games\` ADD \`header_image\` varchar(255) NULL`);
    }

    const gamesTable = await queryRunner.getTable('games');
    const categoriaColumn = gamesTable?.findColumnByName('categoria');

    if (!categoriaColumn) {
      await queryRunner.query(`ALTER TABLE \`games\` ADD \`categoria\` json NOT NULL`);
    } else if (categoriaColumn.type !== 'json') {
      await queryRunner.query(`ALTER TABLE \`games\` DROP COLUMN \`categoria\``);
      await queryRunner.query(`ALTER TABLE \`games\` ADD \`categoria\` json NOT NULL`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const gamesTable = await queryRunner.getTable('games');
    const categoriaColumn = gamesTable?.findColumnByName('categoria');

    if (categoriaColumn?.type === 'json') {
      await queryRunner.query(`ALTER TABLE \`games\` DROP COLUMN \`categoria\``);
      await queryRunner.query(`ALTER TABLE \`games\` ADD \`categoria\` varchar(255) NOT NULL`);
    }

    if (await queryRunner.hasColumn('games', 'header_image')) {
      await queryRunner.query(`ALTER TABLE \`games\` DROP COLUMN \`header_image\``);
    }

    if (await queryRunner.hasColumn('games', 'provider')) {
      await queryRunner.query(`ALTER TABLE \`games\` DROP COLUMN \`provider\``);
    }

    if (await queryRunner.hasColumn('games', 'appid')) {
      await queryRunner.query(`ALTER TABLE \`games\` DROP COLUMN \`appid\``);
    }
  }
}
