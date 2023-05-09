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
const StudentEntity_1 = require("../../db/entities/StudentEntity");
const UserEntity_1 = require("../../db/entities/UserEntity");
/**
 *
 * @deprecated  student services will be removed due to merging the student entity with the user entity
 */
function createStudentService(studentInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const userExists = yield UserEntity_1.User.findOneBy({ id: studentInfo.userId });
        if (!userExists) {
            return {
                error: {
                    message: "user doesn't exist",
                },
            };
        }
        // checking that the user is of type "school_owner"
        if (userExists.type !== UserEntity_1.UserType.STUDENT) {
            return {
                error: {
                    message: "you are not allowed to create a student profile",
                },
            };
        }
        // creating the student
        const student = new StudentEntity_1.Student();
        student.city = studentInfo.city;
        student.country = studentInfo.country;
        student.province = studentInfo.province;
        student.user = userExists;
        yield student.save();
        return {
            student,
        };
    });
}
exports.default = createStudentService;
//# sourceMappingURL=createStudent.service.js.map