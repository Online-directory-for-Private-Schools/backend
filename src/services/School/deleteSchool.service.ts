import { scheduler } from "timers/promises";
import { SchoolService } from "../../interfaces/school.interface";
import checkSchoolExistenceUtil from "./utils/checkSchoolExistence.util";
import makeRespError from "../../utils/makeRespError.util";

interface SchoolInfo {
    id: number;
}

export async function deleteSchoolService(info: SchoolInfo, userId: string): Promise<SchoolService> {
    
    const {id} = info;

    const { school, error } = await checkSchoolExistenceUtil({id})

    if(error || !school) {
        return makeRespError("school not found")
    }

    if(school.owner.id !== userId) {
        return makeRespError("you are not allowed to delete this school")
    }

    await school.remove();

    return {}

}