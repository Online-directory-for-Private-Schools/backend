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
const UserEntity_1 = require("../../db/entities/UserEntity");
const createUser_service_1 = __importDefault(require("../../services/auth/createUser.service"));
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../configs/config");
function registerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let resp;
        if (!isRequestValid(req.body)) {
            resp = {
                error: {
                    message: "Invalid request",
                },
            };
            res.status(400).json(resp);
            return;
        }
        const { name, email, phone_number, password, type, city, province, country } = req.body;
        try {
            const { user, error } = yield (0, createUser_service_1.default)({
                name,
                email,
                phone_number,
                password,
                type,
                city,
                province,
                country
            });
            if (error || !user) {
                resp = { error };
                res.status(400).json(resp);
                return;
            }
            const token = jsonwebtoken_1.default.sign(Object.assign({}, user), config_1.config.jwtSecret, { expiresIn: "2 days" });
            resp = {
                token,
                user
            };
            res.status(200).json(resp);
        }
        catch (error) {
            if (error instanceof typeorm_1.TypeORMError) {
                console.log(error.message);
            }
            console.log(error);
            resp = {
                error: {
                    message: "an error occurred while registering a new user",
                },
            };
            return res.status(500).json(resp);
        }
    });
}
exports.default = registerController;
const isRequestValid = ({ name, email, type, password, city, province, country }) => {
    const isFull = ![name, email, password, city, province, country].includes(undefined);
    const isTypeValid = [UserEntity_1.UserType.SCHOOL_OWNER, UserEntity_1.UserType.STUDENT].includes(type);
    return isFull && isTypeValid;
};
//# sourceMappingURL=register.controller.js.map