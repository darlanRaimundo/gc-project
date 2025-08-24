import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// Migration para criar a tabela 'category' com apenas 'id' e 'nome'.
export class CreateCategory1680000000000 implements MigrationInterface {
  // Executado ao aplicar a migration: cria a tabela category
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'category',
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
            isUnique: true,
          },
        ],
      }),
      true,
    );
  }

  // Executado ao reverter a migration: remove a tabela category
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('category', true);
  }
}
