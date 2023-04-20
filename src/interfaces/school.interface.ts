import { PrivateSchool } from "../db/entities/PrivateSchoolEntity";


export interface CreateSchoolService {
    school?: PrivateSchool
    error?: {
        message: string;
    }
}

