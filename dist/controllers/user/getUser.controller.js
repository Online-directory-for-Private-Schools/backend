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
const getUser_service_1 = __importDefault(require("../../services/user/getUser.service"));
const checkRequest_util_1 = __importDefault(require("./utils/checkRequest.util"));
function getUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { authUser } = req;
        const { id } = req.params;
        let resp;
        const { ok, errMessage, status } = (0, checkRequest_util_1.default)(id, authUser.id);
        if (!ok) {
            resp = {
                error: {
                    message: errMessage,
                },
            };
            res.status(status).send(resp);
            return;
        }
        try {
            // call getUser service
            const { user, error } = yield (0, getUser_service_1.default)({ id });
            // error checking
            if (error || !user) {
                resp = {
                    error,
                };
                return res.status(400).json(resp);
            }
            resp = { user };
            return res.json(resp);
        }
        catch (error) {
            resp = {
                error: {
                    message: "An error occurred while retrieving user"
                }
            };
            return res.status(500).json(resp);
        }
    });
}
exports.default = getUserController;
//# sourceMappingURL=getUser.controller.js.map