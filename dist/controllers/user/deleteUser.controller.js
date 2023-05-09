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
const deleteUser_service_1 = __importDefault(require("../../services/user/deleteUser.service"));
const checkRequest_util_1 = __importDefault(require("./utils/checkRequest.util"));
function deleteUserController(req, res) {
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
            // call deleteUser service
            const { error } = yield (0, deleteUser_service_1.default)({ id });
            // error checking
            if (error) {
                resp = {
                    error,
                };
                return res.status(400).json(resp);
            }
            resp = {
                info: "Successfully deleted user"
            };
            return res.json(resp);
        }
        catch (error) {
            resp = {
                error: {
                    message: "An error occurred while deleting user",
                },
            };
            return res.status(500).json(resp);
        }
    });
}
exports.default = deleteUserController;
//# sourceMappingURL=deleteUser.controller.js.map