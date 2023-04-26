import { PrivateSchool } from "../db/entities/PrivateSchoolEntity";


export interface SchoolService {
    school?: PrivateSchool
    error?: {
        message: string;
    }
}

