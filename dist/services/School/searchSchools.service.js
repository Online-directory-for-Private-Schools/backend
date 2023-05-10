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
exports.searchSchoolsService = void 0;
const typeorm_1 = require("typeorm");
const PrivateSchoolEntity_1 = require("../../db/entities/PrivateSchoolEntity");
function searchSchoolsService(info) {
    return __awaiter(this, void 0, void 0, function* () {
        const validName = info.name ? info.name.toLowerCase() : "";
        const validCountry = info.country ? info.country.toLowerCase() : "";
        const validProvince = info.province ? info.province.toLowerCase() : "";
        const validCity = info.city ? info.city.toLowerCase() : "";
        // ILike does insensitive select
        const query = {
            name: (0, typeorm_1.ILike)(`%${validName}%`),
            country: (0, typeorm_1.ILike)(`%${validCountry}%`),
            city: (0, typeorm_1.ILike)(`%${validCity}%`),
            province: (0, typeorm_1.ILike)(`%${validProvince}%`),
        };
        let { limit, page } = info;
        // pagination
        if (!limit) {
            limit = 20;
        }
        if (!page) {
            page = 1;
        }
        const totalSchoolsCount = yield PrivateSchoolEntity_1.PrivateSchool.countBy(query);
        // we put `...info` before `name` to override name with the regex pattern
        const schools = yield PrivateSchoolEntity_1.PrivateSchool.find({
            where: query,
            loadEagerRelations: false,
            take: limit,
            skip: (page - 1) * limit,
        });
        return {
            data: {
                schools,
                currentPage: page,
                totalPages: Math.ceil(totalSchoolsCount / limit),
                totalSchools: totalSchoolsCount,
            }
        };
    });
}
exports.searchSchoolsService = searchSchoolsService;
//# sourceMappingURL=searchSchools.service.js.map