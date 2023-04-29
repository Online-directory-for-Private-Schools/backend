import { AppDataSource } from "../../data-source";
import { PrivateSchool } from "../../db/entities/PrivateSchoolEntity";
import { EditSchoolRequest } from "../../interfaces/requests.interface";
import { SchoolService } from "../../interfaces/school.interface";
import checkSchoolExistenceUtil from "./utils/checkSchoolExistence.util";
import makeErrorResponseUtil from "./utils/makeErrorResponse.util";

export async function editSchoolService(
    info: EditSchoolRequest,
    userId: string
): Promise<SchoolService> {
    const { name, bio, id, city, country, isHiring, province, street_name } = info;

    // check if shcool exists

    // check if the user owns the school

    // if ok, modify the school

    const { school, error } = await checkSchoolExistenceUtil({ id });

    if (error || !school) {
        return { error };
    }

    if (school.owner.id !== userId) {
        return makeErrorResponseUtil("You do not authorized to edit the school");
    }

    let res = await AppDataSource.createQueryBuilder()
    .update(PrivateSchool, info)
    .where("id = :id", { id })
    .returning("*")
    .updateEntity(true)
    .execute()

    return { school: res.raw[0] as PrivateSchool }
}
