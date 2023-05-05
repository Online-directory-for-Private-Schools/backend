import { FindOptionsWhere, ILike, Like } from "typeorm";
import { PrivateSchool } from "../../db/entities/PrivateSchoolEntity";
import { SearchSchoolsRequest } from "../../interfaces/requests.interface";
import { SchoolService, SearchSchoolsService } from "../../interfaces/school.interface";
import makeRespError from "../../utils/makeRespError.util";

export async function searchSchoolsService(
    info: SearchSchoolsRequest
): Promise<SearchSchoolsService> {

    const validName = info.name ? info.name.toLowerCase() : "";


    // ILike does insensitive select
    let query: FindOptionsWhere<PrivateSchool> = {
        name: ILike(`%${validName}%`)
    };

    let { limit, page } = info;


    // if cityId is provided, ignore provinceId and countryId
    // if provinceId is provided, ignore countryId

    if(info.cityId) {
        query = {
            ...query,
            street: {
                city: {
                    id: info.cityId
                }
            }
        }
    }

    if(info.provinceId && !info.cityId) {
        query = {
            ...query,
            street: {
                city: {
                    province: {
                        id: info.provinceId
                    }
                }
            }
        }
    }


    if(info.countryId && !info.cityId && !info.provinceId) {
        query = {
            ...query,
            street: {
                city: {
                    province: {
                        country: {
                            id: info.countryId
                        }
                    }
                }
            }
        }
    }

    const totalSchoolsCount = await PrivateSchool.countBy(query);

    // we put `...info` before `name` to override name with the regex pattern
    const schools = await PrivateSchool.find({
        where: query,
        loadEagerRelations: false,
        take: limit,
        skip: (page! - 1) * limit!,
    });

    return {
        data: {
            schools,
            currentPage: page,
            totalPages: Math.ceil(totalSchoolsCount/limit!),
            totalSchools: totalSchoolsCount,
        }
    };
}
