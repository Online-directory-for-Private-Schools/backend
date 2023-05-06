import { SchoolService } from "../../interfaces/school.interface";
import getExistingSchool from "./utils/getExistingSchool.util";

interface SchoolInfo {
    id: number;
}

export async function getSchoolService(info: SchoolInfo): Promise<SchoolService> {
    return await getExistingSchool(info, false);
}
