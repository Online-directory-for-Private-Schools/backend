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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const AuthEntity_1 = require("../../db/entities/AuthEntity");
const UserEntity_1 = require("../../db/entities/UserEntity");
function createUserService(regInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        // check if user with given info exists
        const { name, email, password, phone_number, type, city, country, province } = regInfo;
        const userExists = yield UserEntity_1.User.findOneBy({ email });
        if (userExists) {
            return {
                error: {
                    message: "user with the same email already exists"
                }
            };
        }
        // create user entities
        const user = new UserEntity_1.User();
        user.name = name;
        user.email = email;
        user.city = city;
        user.country = country;
        user.province = province;
        if (phone_number)
            user.phone_number = phone_number;
        user.type = type;
        // create Auth entity
        // Todo: add pw validation
        const hashedPw = yield bcrypt_1.default.hash(password, 10);
        const auth = new AuthEntity_1.Auth();
        auth.hashed_password = hashedPw;
        auth.user = user;
        // save user and their auth records
        yield user.save();
        yield auth.save();
        // return user to controller
        return {
            user
        };
    });
}
exports.default = createUserService;
//# sourceMappingURL=createUser.service.js.map