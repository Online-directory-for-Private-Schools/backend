import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntities1681523684215 implements MigrationInterface {
    name = 'CreateEntities1681523684215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photo" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "schoolId" integer, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone_number" numeric NOT NULL, "city" character varying NOT NULL, "province" character varying NOT NULL, "country" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e" UNIQUE ("email"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "rating" double precision NOT NULL, "comment" character varying, "timestamp" TIMESTAMP NOT NULL, "studentId" integer, "schoolId" integer, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "private_school" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "bio" character varying, "phone_number" numeric NOT NULL, "rating" double precision NOT NULL DEFAULT '0', "isHiring" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "lng" integer NOT NULL, "lat" integer NOT NULL, "profilePicId" integer, CONSTRAINT "UQ_b3d85387eaa1cecc983c8ac9f9d" UNIQUE ("email"), CONSTRAINT "REL_f15d964d15a2a87c4b0caf5af0" UNIQUE ("profilePicId"), CONSTRAINT "PK_6aa809f145f2c206adeec4ce370" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "start_time" character varying NOT NULL, "end_time" character varying NOT NULL, "day" character varying NOT NULL, "courseId" integer, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "teacher_name" character varying NOT NULL, "description" character varying NOT NULL, "module" character varying NOT NULL, "level" character varying NOT NULL, "price" numeric, "isActive" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "schoolId" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_92a92cf6e76017c70a95170a540" FOREIGN KEY ("schoolId") REFERENCES "private_school"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_88abd13b683a17c1ff613a7846d" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_6e724918fa12f774e724e01ee13" FOREIGN KEY ("schoolId") REFERENCES "private_school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "private_school" ADD CONSTRAINT "FK_f15d964d15a2a87c4b0caf5af0a" FOREIGN KEY ("profilePicId") REFERENCES "photo"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_be84bbdf75cfb618d393a7f1194" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_04157d2ced6415a8f1edd86b760" FOREIGN KEY ("schoolId") REFERENCES "private_school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_04157d2ced6415a8f1edd86b760"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_be84bbdf75cfb618d393a7f1194"`);
        await queryRunner.query(`ALTER TABLE "private_school" DROP CONSTRAINT "FK_f15d964d15a2a87c4b0caf5af0a"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_6e724918fa12f774e724e01ee13"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_88abd13b683a17c1ff613a7846d"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_92a92cf6e76017c70a95170a540"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`DROP TABLE "private_school"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "photo"`);
    }

}
