import { Country } from "../../db/entities/Address/CountryEntity";
import { ICountriesResponse } from "../../interfaces/responses.interface";

export default async function getCountriesService() : Promise<ICountriesResponse> {
    
    const countries = await Country.find();

    return { countries };

}