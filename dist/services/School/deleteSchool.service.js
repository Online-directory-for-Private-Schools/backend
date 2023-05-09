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
exports.deleteSchoolService = void 0;
const checkSchoolExistence_util_1 = __importDefault(require("./utils/checkSchoolExistence.util"));
const makeErrorResponse_util_1 = __importDefault(require("./utils/makeErrorResponse.util"));
function deleteSchoolService(info, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = info;
        const { school, error } = yield (0, checkSchoolExistence_util_1.default)({ id });
        if (error || !school) {
            return (0, makeErrorResponse_util_1.default)("school not found");
        }
        if (school.owner.id !== userId) {
            return (0, makeErrorResponse_util_1.default)("you are not allowed to delete this school");
        }
        yield school.remove();
        return {};
    });
}
exports.deleteSchoolService = deleteSchoolService;
//# sourceMappingURL=deleteSchool.service.js.map