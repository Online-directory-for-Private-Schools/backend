import { scheduler } from "timers/promises";
import { SchoolService } from "../../interfaces/school.interface";
import checkSchoolExistenceUtil from "./utils/checkSchoolExistence.util";
import makeErrorResponseUtil from "./utils/makeErrorResponse.util";

interface SchoolInfo {
    id: number;
}

export async function deleteSchoolService(info: SchoolInfo, userId: string): Promise<SchoolService> {
    
    const {id} = info;

    const { school, error } = await checkSchoolExistenceUtil({id})

    if(error || !school) {
        return makeErrorResponseUtil("school not found")
    }

    if(school.owner.id !== userId) {
        return makeErrorResponseUtil("you are not allowed to delete this school")
    }

    await school.remove();

    return {}

}