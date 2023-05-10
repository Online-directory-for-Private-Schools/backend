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
const truthifyObject_util_1 = __importDefault(require("../../utils/truthifyObject.util"));
const makeErrorResponse_util_1 = __importDefault(require("../../services/School/utils/makeErrorResponse.util"));
const searchSchools_service_1 = require("../../services/School/searchSchools.service");
function searchSchoolsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, city, country, province, isHiring, page, limit } = req.query;
        let resp;
        // filtering the request to only have non-false values
        const filteredBodyObj = (0, truthifyObject_util_1.default)({ name, city, country, province, isHiring, page: +page, limit: +limit });
        try {
            const { data, error } = yield (0, searchSchools_service_1.searchSchoolsService)(filteredBodyObj);
            // error checking
            if (error || !data) {
                resp = { error };
                return res.status(400).json(resp);
            }
            resp = { data };
            return res.json(resp);
        }
        catch (error) {
            // TODO: [SEG310-86] handle error types
            resp = (0, makeErrorResponse_util_1.default)("an error occured while searching for schools");
            console.log(error);
            return res.status(500).json(resp);
        }
    });
}
exports.default = searchSchoolsController;
//# sourceMappingURL=searchSchools.controller.js.map