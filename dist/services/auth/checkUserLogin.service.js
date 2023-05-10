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
const AuthEntity_1 = require("../../db/entities/AuthEntity");
const UserEntity_1 = require("../../db/entities/UserEntity");
const bcrypt_1 = __importDefault(require("bcrypt"));
function checkUserLoginService({ email, password, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const userExists = yield UserEntity_1.User.findOneBy({ email });
        if (!userExists) {
            return {
                error: {
                    message: "there is no user with that email",
                },
            };
        }
        const auth = yield AuthEntity_1.Auth.findOneBy({ user: { id: userExists.id } });
        if (!auth) {
            return {
                error: {
                    message: "User doesn't have credentials",
                },
            };
        }
        const isValid = yield bcrypt_1.default.compare(password, auth.hashed_password);
        if (!isValid) {
            return {
                error: {
                    message: "The provided password is incorrect",
                },
            };
        }
        return {
            user: userExists,
        };
    });
}
exports.default = checkUserLoginService;
//# sourceMappingURL=checkUserLogin.service.js.map