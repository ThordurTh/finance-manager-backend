import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestMigration1708599969614 implements MigrationInterface {
  name = 'TestMigration1708599969614';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME COLUMN "something" TO "categoryId"`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" ADD CONSTRAINT "FK_5e1c00d1bf0d7f449fbd257d3c8" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" DROP CONSTRAINT "FK_5e1c00d1bf0d7f449fbd257d3c8"`,
    );
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME COLUMN "categoryId" TO "something"`,
    );
  }
}
