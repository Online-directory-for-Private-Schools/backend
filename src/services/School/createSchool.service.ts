import { PrivateSchool } from "../../db/entities/PrivateSchoolEntity";
import { User, UserType } from "../../db/entities/UserEntity";
import { ICreateSchoolRequest } from "../../interfaces/requests.interface";
import { SchoolService } from "../../interfaces/school.interface";
import { AppDataSource } from "../../data-source";
import { StreetAddress } from "../../db/entities/Address/StreetAddressEntity";
import { City } from "../../db/entities/Address/CityEntity";
import makeRespErrorUtil from "../../utils/makeRespError.util";

export default async function createSchoolService(
    schoolInfo: ICreateSchoolRequest
): Promise<SchoolService> {

    const userExists = await User.findOneBy({ id: schoolInfo.userId });

    if (!userExists) {
        return makeRespErrorUtil("user doesn't exist");
    }

    // checking that the user is of type "school_owner"
    if (userExists.type !== UserType.SCHOOL_OWNER) {
        return makeRespErrorUtil("you are not allowed to create schools");
    }

    const schoolExists = await PrivateSchool.findOneBy({ owner: { id: schoolInfo.userId } });

    if (schoolExists) {
        return makeRespErrorUtil("You can't create more than one school, yet");
    }

    // check if city exists
    const cityExists = await City.findOneBy({ id: schoolInfo.cityId });

    if (!cityExists) {
        return makeRespErrorUtil("city doesn't exist");
    }

    // create address
    const street = new StreetAddress();
    street.name = schoolInfo.street_name;
    street.city = cityExists;

    // creating school
    const school = new PrivateSchool();
    school.name = schoolInfo.name;
    if(schoolInfo.lng && schoolInfo.lat) {
        school.lng = schoolInfo.lng;
        school.lat = schoolInfo.lat;
    }
    school.email = schoolInfo.email;
    school.phone_number = schoolInfo.phone_number;
    if(schoolInfo.website)
        school.website = schoolInfo.website;
    school.street = street;
    school.owner = userExists;

    if (schoolInfo.bio) school.bio = schoolInfo.bio;

    if (schoolInfo.isHiring) school.isHiring = schoolInfo.isHiring;

    await AppDataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(street);
        await transactionalEntityManager.save(school);
    });

    await school.reload();

    return {
        school,
    };
}
