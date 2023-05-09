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
const getSchool_service_1 = require("../../services/School/getSchool.service");
const makeErrorResponse_util_1 = __importDefault(require("../../services/School/utils/makeErrorResponse.util"));
function getSchoolController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        let resp;
        if (!id || !Number(id)) {
            resp = (0, makeErrorResponse_util_1.default)("please provide a correct ID to fetch a school");
            return res.status(400).json(resp);
        }
        try {
            // get school by invoking the service
            const { school, error } = yield (0, getSchool_service_1.getSchoolService)({ id: +id });
            if (error || !school) {
                resp = { error };
                return res.status(400).json(resp);
            }
            resp = {
                school
            };
            return res.status(200).json(resp);
        }
        catch (error) {
            resp = (0, makeErrorResponse_util_1.default)("an error occured while fetching school info");
            return res.status(500).json(resp);
        }
    });
}
exports.default = getSchoolController;
//# sourceMappingURL=getSchool.controller.js.map