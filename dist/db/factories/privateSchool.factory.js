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
const typeorm_extension_1 = require("typeorm-extension");
const AuthEntity_1 = require("../entities/AuthEntity");
const PrivateSchoolEntity_1 = require("../entities/PrivateSchoolEntity");
const UserEntity_1 = require("../entities/UserEntity");
exports.default = (0, typeorm_extension_1.setSeederFactory)(PrivateSchoolEntity_1.PrivateSchool, (faker) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new UserEntity_1.User();
    const auth = new AuthEntity_1.Auth();
    // initialize the user object
    user.name = faker.name.fullName();
    user.email = faker.internet.email(user.name);
    user.phone_number = faker.phone.number("+213 ### ## ## ##");
    user.type = UserEntity_1.UserType.SCHOOL_OWNER;
    yield user.save();
    // initialize the privateschool object
    const privateSchool = new PrivateSchoolEntity_1.PrivateSchool();
    privateSchool.name = faker.company.name();
    privateSchool.street_name = faker.address.streetAddress();
    privateSchool.city = faker.address.city();
    privateSchool.province = faker.address.state();
    privateSchool.country = faker.address.country();
    privateSchool.lat = faker.address.latitude();
    privateSchool.lng = faker.address.longitude();
    privateSchool.owner = user;
    // initialize the auth object
    auth.user = user;
    auth.hashed_password = faker.internet.password();
    console.log("AUTH TEEEST", auth);
    yield auth.save();
    return privateSchool;
}));
//# sourceMappingURL=privateSchool.factory.js.map