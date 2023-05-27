import { PrivateSchool } from "../../../db/entities/PrivateSchoolEntity";
import { User } from "../../../db/entities/UserEntity";
import { IGetUserSchoolsResponse } from "../../../interfaces/responses.interface";
import makeRespErrorUtil from "../../../utils/makeRespError.util";

export default async function getUserSchoolsService(
    userId: string
): Promise<IGetUserSchoolsResponse> {
    // check if user exists
    const schools = await PrivateSchool.find({
        where: {
            owner: {
                id: userId,
            },
        },
    });

    if(schools.length === 0) {
        return makeRespErrorUtil("You don't have any schools created")
    }

    return { schools };
}
