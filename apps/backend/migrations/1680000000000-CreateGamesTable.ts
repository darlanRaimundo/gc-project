import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGamesTable1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'games',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'appid',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
            default: '',
          },
          {
            name: 'categoria',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'header_image',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('games');
  }
}
