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
const checkRequest_util_1 = __importDefault(require("./utils/checkRequest.util"));
const truthifyObject_util_1 = __importDefault(require("../../utils/truthifyObject.util"));
const editUser_service_1 = __importDefault(require("../../services/user/editUser.service"));
const isObjectEmpty_util_1 = __importDefault(require("../../utils/isObjectEmpty.util"));
function editUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { authUser } = req;
        const { id } = req.params;
        const { name, phone_number, city, province, country } = req.body;
        const { ok, errMessage, status } = (0, checkRequest_util_1.default)(id, authUser.id);
        let resp;
        if (!ok) {
            resp = {
                error: {
                    message: errMessage,
                },
            };
            res.status(status).send(resp);
            return;
        }
        const filteredBodyObj = (0, truthifyObject_util_1.default)({ name, phone_number, city, province, country });
        if ((0, isObjectEmpty_util_1.default)(filteredBodyObj)) {
            resp = {
                error: {
                    message: "You must provide at least one user attribute to edit"
                }
            };
            res.status(400).json(resp);
            return;
        }
        try {
            // call editUser service
            const { user, error } = yield (0, editUser_service_1.default)(Object.assign(Object.assign({}, filteredBodyObj), { id }));
            // error checking
            if (error) {
                resp = {
                    error,
                };
                return res.status(400).json(resp);
            }
            resp = {
                user
            };
            return res.json(resp);
        }
        catch (error) {
            resp = {
                error: {
                    message: "An error occurred while editing user",
                },
            };
            return res.status(500).json(resp);
        }
    });
}
exports.default = editUserController;
//# sourceMappingURL=editUser.controller.js.map