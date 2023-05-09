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
const PrivateSchoolEntity_1 = require("../../db/entities/PrivateSchoolEntity");
const UserEntity_1 = require("../../db/entities/UserEntity");
function createSchoolService(schoolInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        // check if user exists or not
        const userExists = yield UserEntity_1.User.findOneBy({ id: schoolInfo.userId });
        if (!userExists) {
            return {
                error: {
                    message: "user doesn't exist"
                }
            };
        }
        // checking that the user is of type "school_owner"
        if (userExists.type !== UserEntity_1.UserType.SCHOOL_OWNER) {
            return {
                error: {
                    message: "you are not allowed to create schools"
                }
            };
        }
        const schoolExists = yield PrivateSchoolEntity_1.PrivateSchool.findOneBy({ owner: { id: schoolInfo.userId } });
        if (schoolExists) {
            return {
                error: {
                    message: "You can't create more than one school, yet"
                }
            };
        }
        // creating school
        const school = new PrivateSchoolEntity_1.PrivateSchool();
        school.name = schoolInfo.name;
        school.lng = schoolInfo.lng;
        school.lat = schoolInfo.lat;
        school.city = schoolInfo.city;
        school.province = schoolInfo.province;
        school.country = schoolInfo.country;
        school.street_name = schoolInfo.street_name;
        school.owner = userExists;
        if (schoolInfo.bio)
            school.bio = schoolInfo.bio;
        if (schoolInfo.isHiring)
            school.isHiring = schoolInfo.isHiring;
        yield school.save();
        return {
            school
        };
    });
}
exports.default = createSchoolService;
//# sourceMappingURL=createSchool.service.js.map