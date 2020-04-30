import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class ProceduresForeignKeySubarea1588279037122
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'procedures',
      new TableForeignKey({
        name: 'LinkingProceduresAndSubareas',
        columnNames: ['subarea_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'subareas',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'procedures',
      'LinkingProceduresAndSubareas',
    );
  }
}
