import { SchoolService } from "../../interfaces/school.interface";

interface filterInfo {
    name: string;
    city: string;
    country: string;
    province: string;
    isHiring?: boolean;
}

export async function searchSchoolsService(info: filterInfo): Promise<SchoolService> {
    return {}
}
