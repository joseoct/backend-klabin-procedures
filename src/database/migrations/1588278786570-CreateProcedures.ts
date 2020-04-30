import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProcedures1588278786570
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'procedures',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'index',
            type: 'integer',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'tag',
            type: 'varchar',
          },
          {
            name: 'font',
            type: 'varchar',
          },
          {
            name: 'local',
            type: 'varchar',
          },
          {
            name: 'observations',
            type: 'varchar',
          },
          {
            name: 'subarea_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('procedures');
  }
}
