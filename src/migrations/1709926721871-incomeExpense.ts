import { MigrationInterface, QueryRunner } from 'typeorm';

export class IncomeExpense1709926721871 implements MigrationInterface {
  name = 'IncomeExpense1709926721871';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" ADD "incomeExpense" character varying NOT NULL DEFAULT 'expense'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "incomeExpense"`);
  }
}
