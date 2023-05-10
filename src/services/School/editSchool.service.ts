import { AppDataSource } from "../../data-source";
import { PrivateSchool } from "../../db/entities/PrivateSchoolEntity";
import { IEditSchoolRequest } from "../../interfaces/requests.interface";
import { SchoolService } from "../../interfaces/school.interface";
import getExistingSchool from "./utils/getExistingSchool.util";

import { City } from "../../db/entities/Address/CityEntity";
import makeRespErrorUtil from "../../utils/makeRespError.util";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";

interface IEditSchoolService extends IEditSchoolRequest {
    id: number
}

export async function editSchoolService(
    info: IEditSchoolService,
    userId: string
): Promise<SchoolService> {
    const { id, cityId, streetName, name, bio, isHiring, lat, lng } = info;

    const { school, error } = await getExistingSchool({ id });

    if (error || !school) {
        return { error };
    }

    const owner = school.owner;

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

    await AppDataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(school);
        await transactionalEntityManager.save(school.street);
    });

    await school.reload();

    return { school };
}
