"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEntities1681939882415 = void 0;
class CreateEntities1681939882415 {
    constructor() {
        this.name = 'CreateEntities1681939882415';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone_number" numeric, "type" "public"."users_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "auth" ("userId" integer NOT NULL, "hashed_password" character varying NOT NULL, CONSTRAINT "PK_373ead146f110f04dad60848154" PRIMARY KEY ("userId"))`);
            yield queryRunner.query(`CREATE TABLE "photos" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "schoolId" integer, CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "city" character varying NOT NULL, "province" character varying NOT NULL, "country" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_e0208b4f964e609959aff431bf" UNIQUE ("userId"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "rating" double precision NOT NULL, "comment" character varying, "timestamp" TIMESTAMP NOT NULL, "studentId" integer, "schoolId" integer, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "private_schools" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "bio" character varying, "rating" double precision NOT NULL DEFAULT '0', "isHiring" boolean NOT NULL DEFAULT false, "lng" integer NOT NULL, "lat" integer NOT NULL, "city" character varying NOT NULL, "street_name" character varying NOT NULL, "province" character varying NOT NULL, "country" character varying NOT NULL, "ownerId" integer, "profilePicId" integer, CONSTRAINT "REL_38581cbec9374c9606b02c9e15" UNIQUE ("ownerId"), CONSTRAINT "REL_01b39546508b694adacf9396c2" UNIQUE ("profilePicId"), CONSTRAINT "PK_082285126131f408f9c56806313" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "schedules" ("id" SERIAL NOT NULL, "start_time" character varying NOT NULL, "end_time" character varying NOT NULL, "day" character varying NOT NULL, "courseId" integer, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "courses" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "teacher_name" character varying NOT NULL, "description" character varying NOT NULL, "module" character varying NOT NULL, "level" character varying NOT NULL, "price" numeric, "isActive" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "schoolId" integer, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "FK_373ead146f110f04dad60848154" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_814e192d0c56445869c93367669" FOREIGN KEY ("schoolId") REFERENCES "private_schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_e0208b4f964e609959aff431bf9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_63a921d8859a586e1fc91ff4f5f" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_568c3bb92f152d060ac5d9faa14" FOREIGN KEY ("schoolId") REFERENCES "private_schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "private_schools" ADD CONSTRAINT "FK_38581cbec9374c9606b02c9e155" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "private_schools" ADD CONSTRAINT "FK_01b39546508b694adacf9396c2f" FOREIGN KEY ("profilePicId") REFERENCES "photos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_e00a5ee3b179da2f408ced6e952" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_9689700fc21294dc6abbb0e3180" FOREIGN KEY ("schoolId") REFERENCES "private_schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_9689700fc21294dc6abbb0e3180"`);
            yield queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_e00a5ee3b179da2f408ced6e952"`);
            yield queryRunner.query(`ALTER TABLE "private_schools" DROP CONSTRAINT "FK_01b39546508b694adacf9396c2f"`);
            yield queryRunner.query(`ALTER TABLE "private_schools" DROP CONSTRAINT "FK_38581cbec9374c9606b02c9e155"`);
            yield queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_568c3bb92f152d060ac5d9faa14"`);
            yield queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_63a921d8859a586e1fc91ff4f5f"`);
            yield queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_e0208b4f964e609959aff431bf9"`);
            yield queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_814e192d0c56445869c93367669"`);
            yield queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "FK_373ead146f110f04dad60848154"`);
            yield queryRunner.query(`DROP TABLE "courses"`);
            yield queryRunner.query(`DROP TABLE "schedules"`);
            yield queryRunner.query(`DROP TABLE "private_schools"`);
            yield queryRunner.query(`DROP TABLE "reviews"`);
            yield queryRunner.query(`DROP TABLE "students"`);
            yield queryRunner.query(`DROP TABLE "photos"`);
            yield queryRunner.query(`DROP TABLE "auth"`);
            yield queryRunner.query(`DROP TABLE "users"`);
        });
    }
}
exports.CreateEntities1681939882415 = CreateEntities1681939882415;
//# sourceMappingURL=1681939882415-createEntities.js.map