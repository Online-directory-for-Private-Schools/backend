import { MigrationInterface, QueryRunner } from "typeorm";

export class MergeUserWithStudent1682350592678 implements MigrationInterface {
    name = 'MergeUserWithStudent1682350592678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_63a921d8859a586e1fc91ff4f5f"`);
        await queryRunner.query(`ALTER TABLE "reviews" RENAME COLUMN "studentId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "province" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "country" character varying`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "province"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "reviews" RENAME COLUMN "userId" TO "studentId"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_63a921d8859a586e1fc91ff4f5f" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
