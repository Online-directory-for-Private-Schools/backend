import { ILike, Like } from "typeorm";
import { PrivateSchool } from "../../db/entities/PrivateSchoolEntity";
import { SearchSchoolsRequest } from "../../interfaces/requests.interface";
import { SchoolService, SearchSchoolsService } from "../../interfaces/school.interface";
import makeErrorResponseUtil from "./utils/makeErrorResponse.util";

export async function searchSchoolsService(
    info: SearchSchoolsRequest
): Promise<SearchSchoolsService> {

    const validName = info.name ? info.name.toLowerCase() : "";
    const validCountry = info.country ? info.country.toLowerCase() : "";
    const validProvince = info.province ? info.province.toLowerCase() : "";
    const validCity = info.city ? info.city.toLowerCase() : "";

    // ILike does insensitive select
    const query = {
        name: ILike(`%${validName}%`),
        country: ILike(`%${validCountry}%`),
        city: ILike(`%${validCity}%`),
        province: ILike(`%${validProvince}%`),
    };

    let { limit, page } = info;

    // pagination
    if (!limit) {
        limit = 20;
    }

    if (!page) {
        page = 1;
    }

    const totalSchoolsCount = await PrivateSchool.countBy(query);

    // we put `...info` before `name` to override name with the regex pattern
    const schools = await PrivateSchool.find({
        where: query,
        loadEagerRelations: false,
        take: limit,
        skip: (page - 1) * limit,
    });

    return {
        data: {
            schools,
            currentPage: page,
            totalPages: Math.ceil(totalSchoolsCount/limit),
            totalSchools: totalSchoolsCount,
        }
    };
}
