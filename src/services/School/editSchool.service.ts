import { AppDataSource } from "../../data-source";
import { PrivateSchool } from "../../db/entities/PrivateSchoolEntity";
import { EditSchoolRequest } from "../../interfaces/requests.interface";
import { SchoolService } from "../../interfaces/school.interface";
import checkSchoolExistenceUtil from "./utils/checkSchoolExistence.util";

import { City } from "../../db/entities/Address/CityEntity";
import makeRespErrorUtil from "../../utils/makeRespError.util";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";

export async function editSchoolService(
    info: EditSchoolRequest,
    userId: string
): Promise<SchoolService> {
    const { id, cityId, streetName, name, bio, isHiring, lat, lng } = info;

    const { school, error } = await checkSchoolExistenceUtil({ id });

    if (error || !school) {
        return { error };
    }

    const owner = await school.owner

    if (owner.id !== userId) {
        return makeRespErrorUtil("You do not authorized to edit the school");
    }

    if (streetName) {
        school.street.name = streetName;
    }

    if (cityId) {
        // check if city exists
        const cityExists = await City.findOneBy({ id: cityId });

        if (!cityExists) {
            return makeRespErrorUtil("City Doesn't exist");
        }

        school.street.city = cityExists;
    }

    const filteredInfo = filterObjectFromFalsyValues({ name, bio, isHiring, lat, lng });


    Object.keys(filteredInfo).forEach((key) => {
        (school as any)[key] = filteredInfo[key];
    });

    AppDataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(school);
        await transactionalEntityManager.save(school.street);
    });


    await school.reload();

    return { school };
}
