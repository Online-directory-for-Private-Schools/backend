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
exports.MergeUserWithStudent1682350592678 = void 0;
class MergeUserWithStudent1682350592678 {
    constructor() {
        this.name = 'MergeUserWithStudent1682350592678';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_63a921d8859a586e1fc91ff4f5f"`);
            yield queryRunner.query(`ALTER TABLE "reviews" RENAME COLUMN "studentId" TO "userId"`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "city" character varying`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "province" character varying`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "country" character varying`);
            yield queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "userId"`);
            yield queryRunner.query(`ALTER TABLE "reviews" ADD "userId" uuid`);
            yield queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
            yield queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "userId"`);
            yield queryRunner.query(`ALTER TABLE "reviews" ADD "userId" integer`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "country"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "province"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "city"`);
            yield queryRunner.query(`ALTER TABLE "reviews" RENAME COLUMN "userId" TO "studentId"`);
            yield queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_63a921d8859a586e1fc91ff4f5f" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.MergeUserWithStudent1682350592678 = MergeUserWithStudent1682350592678;
//# sourceMappingURL=1682350592678-merge-user-with-student.js.map