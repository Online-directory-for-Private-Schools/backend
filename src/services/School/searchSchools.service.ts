import { FindOptionsWhere, ILike } from "typeorm";
import { PrivateSchool } from "../../db/entities/PrivateSchoolEntity";
import { ISearchSchoolsRequest } from "../../interfaces/requests.interface";
import { SearchSchoolsService } from "../../interfaces/school.interface";

export async function searchSchoolsService(
    info: ISearchSchoolsRequest
): Promise<SearchSchoolsService> {
    const validName = info.name ? info.name.toLowerCase() : "";

    // ILike does insensitive select
    let query: FindOptionsWhere<PrivateSchool> = {
        name: ILike(`%${validName}%`),
    };

    let { limit, page } = info;

    // if cityId is provided, ignore provinceId and countryId
    // if provinceId is provided, ignore countryId

    if (info.cityId) {
        query = {
            ...query,
            street: {
                city: {
                    id: info.cityId,
                },
            },
        };
    }

    if (info.provinceId && !info.cityId) {
        query = {
            ...query,
            street: {
                city: {
                    province: {
                        id: info.provinceId,
                    },
                },
            },
        };
    }

    if (info.countryId && !info.cityId && !info.provinceId) {
        query = {
            ...query,
            street: {
                city: {
                    province: {
                        country: {
                            id: info.countryId,
                        },
                    },
                },
            },
        };
    }

    const totalSchoolsCount = await PrivateSchool.countBy(query);

    
    const schools = await PrivateSchool.find({
        relations: {
            street: {
                city: {
                    province: {
                        country: true
                    }
                }
            }
        },
        where: query,
        loadEagerRelations: false,
        take: limit,
        skip: (page! - 1) * limit!,
    });

    return {
        data: {
            schools,
            currentPage: page,
            totalPages: Math.ceil(totalSchoolsCount / limit!),
            totalSchools: totalSchoolsCount,
        },
    };
}
