import { SchoolService } from "../../interfaces/school.interface";
import getExistingSchool from "./utils/getExistingSchool.util";
import makeRespError from "../../utils/makeRespError.util";

interface SchoolInfo {
    id: number;
}

export async function deleteSchoolService(info: SchoolInfo, userId: string): Promise<SchoolService> {
    
    const {id} = info;

    const { school, error } = await getExistingSchool({id})

    if(error || !school) {
        return makeRespError(error!.message)
    }

    const owner = school.owner

    if(owner.id !== userId) {
        return makeRespError("you are not allowed to delete this school")
    }

    await school.remove();

    return {}

}