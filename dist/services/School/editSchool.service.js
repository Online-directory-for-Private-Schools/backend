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
exports.editSchoolService = void 0;
const data_source_1 = require("../../data-source");
const PrivateSchoolEntity_1 = require("../../db/entities/PrivateSchoolEntity");
const checkSchoolExistence_util_1 = __importDefault(require("./utils/checkSchoolExistence.util"));
const makeErrorResponse_util_1 = __importDefault(require("./utils/makeErrorResponse.util"));
function editSchoolService(info, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, bio, id, city, country, isHiring, province, street_name } = info;
        // check if shcool exists
        // check if the user owns the school
        // if ok, modify the school
        const { school, error } = yield (0, checkSchoolExistence_util_1.default)({ id });
        if (error || !school) {
            return { error };
        }
        if (school.owner.id !== userId) {
            return (0, makeErrorResponse_util_1.default)("You do not authorized to edit the school");
        }
        let res = yield data_source_1.AppDataSource.createQueryBuilder()
            .update(PrivateSchoolEntity_1.PrivateSchool, info)
            .where("id = :id", { id })
            .returning("*")
            .updateEntity(true)
            .execute();
        return { school: res.raw[0] };
    });
}
exports.editSchoolService = editSchoolService;
//# sourceMappingURL=editSchool.service.js.map