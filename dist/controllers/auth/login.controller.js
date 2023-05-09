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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const config_1 = require("../../configs/config");
const checkUserLogin_service_1 = __importDefault(require("../../services/auth/checkUserLogin.service"));
// TODO: Refactor with Register controller
function loginController(req, res) {
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
        const { email, password } = req.body;
        try {
            const { user, error } = yield (0, checkUserLogin_service_1.default)({ email, password });
            if (error || !user) {
                resp = { error };
                res.status(400).json(resp);
                return;
            }
            const token = jsonwebtoken_1.default.sign(Object.assign({}, user), config_1.config.jwtSecret, { expiresIn: "2 days" });
            resp = {
                token,
                user,
            };
            res.status(200).json(resp);
        }
        catch (error) {
            if (error instanceof typeorm_1.TypeORMError) {
                console.log(error.message);
            }
            resp = {
                error: {
                    message: "an error occurred while logging in",
                },
            };
            return res.status(500).json(resp);
        }
    });
}
exports.default = loginController;
const isRequestValid = ({ email, password }) => {
    const isFull = ![email, password].includes(undefined);
    return isFull;
};
//# sourceMappingURL=login.controller.js.map