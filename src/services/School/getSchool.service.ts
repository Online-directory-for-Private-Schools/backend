import { SchoolService } from "../../interfaces/school.interface";
import checkSchoolExistenceUtil from "./utils/checkSchoolExistence.util";

interface SchoolInfo {
    id: number;
}

export async function getSchoolService(info: SchoolInfo): Promise<SchoolService> {

    return checkSchoolExistenceUtil(info);

}
