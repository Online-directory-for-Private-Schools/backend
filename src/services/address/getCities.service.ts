import { City } from "../../db/entities/Address/CityEntity";
import { Country } from "../../db/entities/Address/CountryEntity";
import { Province } from "../../db/entities/Address/ProvinceEntity";
import { CitiesResponse, CountriesResponse } from "../../interfaces/responses.interface";
import makeRespErrorUtil from "../../utils/makeRespError.util";

export default async function getCitiesService(provinceId: number): Promise<CitiesResponse> {
    // check if country exists
    const provinceExists = await Province.findOneBy({ id: provinceId });

    if (!provinceExists) {
        return makeRespErrorUtil("There is no province with the given id");
    }

    const cities = await City.find({
        where: {
            province: {
                id: provinceId,
            },
        },
        loadEagerRelations: false,
    });

    return { cities };
}
