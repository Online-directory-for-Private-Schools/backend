import { PrivateSchool } from "../../../db/entities/PrivateSchoolEntity";
import { SchoolService } from "../../../interfaces/school.interface";

interface SchoolInfo {
    id: number;
}

export default async function checkSchoolExistenceUtil(info: SchoolInfo): Promise<SchoolService> {

    const { id } = info;

    const schoolExists = await PrivateSchool.findOneBy({id})

    if(!schoolExists) {
        return {
            error: {
                message: "school with the provided id not found"
            }
        }
    }
    

    return {
        school: schoolExists
    }
}