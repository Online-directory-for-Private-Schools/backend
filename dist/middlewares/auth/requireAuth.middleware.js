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
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../configs/config");
function requireAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = req.header("Authorization");
            if (!authHeader) {
                res.status(401).json({
                    error: {
                        message: "Authorization token is required",
                    },
                });
                return;
            }
            // token = "Bearer TOKEN_HERE
            const token = authHeader.split(" ")[1];
            // checking if token is valid
            const { id } = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
            // adding the user id to the request object
            req.authUser = { id };
            // executing the protected controller function after we have validated the token
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                res.status(400).json({
                    error: {
                        message: "Expired token",
                    },
                });
                return;
            }
            if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                res.status(401).json({
                    error: {
                        message: "Invalid token",
                    },
                });
                return;
            }
            res.status(500).json({
                error: {
                    message: "An error has occurred while authenticating.",
                },
            });
            return;
        }
    });
}
exports.requireAuth = requireAuth;
//# sourceMappingURL=requireAuth.middleware.js.map