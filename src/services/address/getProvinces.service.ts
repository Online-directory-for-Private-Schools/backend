import { Country } from "../../db/entities/Address/CountryEntity";
import { Province } from "../../db/entities/Address/ProvinceEntity";
import { ICountriesResponse, IProvincesResponse } from "../../interfaces/responses.interface";
import makeRespErrorUtil from "../../utils/makeRespError.util";

export default async function getProvincesService(countryId: number): Promise<IProvincesResponse> {
    // check if country exists
    const countryExists = await Country.findOneBy({ id: countryId });

    if (!countryExists) {
        return makeRespErrorUtil("There is no country with the given id");
    }

    const provinces = await Province.find({
        where: {
            country: {
                id: countryId,
            },
        },
        loadEagerRelations: false,
    });

    return { provinces };
}
