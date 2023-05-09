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
const editSchool_service_1 = require("../../services/School/editSchool.service");
const makeErrorResponse_util_1 = __importDefault(require("../../services/School/utils/makeErrorResponse.util"));
const isObjectEmpty_util_1 = __importDefault(require("../../utils/isObjectEmpty.util"));
const truthifyObject_util_1 = __importDefault(require("../../utils/truthifyObject.util"));
function editSchoolController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { authUser } = req;
        const { id } = req.params;
        const { name, bio, city, country, isHiring, province, street_name, lat, lng } = req.body;
        let resp;
        if (!Number(id)) {
            resp = (0, makeErrorResponse_util_1.default)("id has to be a number");
            res.status(400).json(resp);
            return;
        }
        const filteredBodyObj = (0, truthifyObject_util_1.default)({ name, bio, city, country, isHiring, province, street_name, lat, lng });
        if ((0, isObjectEmpty_util_1.default)(filteredBodyObj)) {
            resp = (0, makeErrorResponse_util_1.default)("At least one school attribute needs to be provided");
            res.status(400).json(resp);
            return;
        }
        try {
            // call editUser service
            const { school, error } = yield (0, editSchool_service_1.editSchoolService)(Object.assign(Object.assign({}, filteredBodyObj), { id: +id }), authUser.id);
            // error checking
            if (error || !school) {
                resp = { error };
                return res.status(400).json(resp);
            }
            resp = { school };
            return res.json(resp);
        }
        catch (error) {
            // TODO: [SEG310-86] handle error types
            resp = (0, makeErrorResponse_util_1.default)("an error occured while editing the school");
            console.log(error);
            return res.status(500).json(resp);
        }
    });
}
exports.default = editSchoolController;
//# sourceMappingURL=editSchool.controller.js.map