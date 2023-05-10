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
const makeErrorResponse_util_1 = __importDefault(require("../../services/School/utils/makeErrorResponse.util"));
const deleteSchool_service_1 = require("../../services/School/deleteSchool.service");
function deleteSchoolController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { authUser } = req;
        const { id } = req.params;
        let resp;
        if (!Number(id)) {
            resp = (0, makeErrorResponse_util_1.default)("id has to be a number");
            res.status(400).json(resp);
            return;
        }
        try {
            const { error } = yield (0, deleteSchool_service_1.deleteSchoolService)({ id: +id }, authUser.id);
            if (error) {
                resp = { error };
                // TODO: [SEG310-87] handle error codes better
                return res.status(400).json(resp);
            }
            resp = {
                info: "Successfully deleted the school",
            };
            return res.json(resp);
        }
        catch (error) {
            resp = (0, makeErrorResponse_util_1.default)("error while deleting the school");
            return res.status(500).json(resp);
        }
    });
}
exports.default = deleteSchoolController;
//# sourceMappingURL=deleteSchool.controller.js.map