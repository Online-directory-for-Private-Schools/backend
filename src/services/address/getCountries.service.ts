import { Country } from "../../db/entities/Address/CountryEntity";
import { CountriesResponse } from "../../interfaces/responses.interface";

export default async function getCountriesService() : Promise<CountriesResponse> {
    
    const countries = await Country.find();

    return { countries };

}