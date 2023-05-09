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
Object.defineProperty(exports, "__esModule", { value: true });
const PrivateSchoolEntity_1 = require("../../../db/entities/PrivateSchoolEntity");
function checkSchoolExistenceUtil(info) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = info;
        const schoolExists = yield PrivateSchoolEntity_1.PrivateSchool.findOneBy({ id });
        if (!schoolExists) {
            return {
                error: {
                    message: "school with the provided id not found"
                }
            };
        }
        return {
            school: schoolExists
        };
    });
}
exports.default = checkSchoolExistenceUtil;
//# sourceMappingURL=checkSchoolExistence.util.js.map