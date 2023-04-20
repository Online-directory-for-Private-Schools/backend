import { PrivateSchool } from "../db/entities/PrivateSchoolEntity";
import { Student } from "../db/entities/StudentEntity";
import { User } from "../db/entities/UserEntity";
import { ResponseError } from "./responseError.interface";

export interface CreateSchoolResponse {
    school?: PrivateSchool;
    error?: ResponseError
}

export interface CreateStudentResponse {
    student?: Student;
    error?: ResponseError
}


export interface AuthResponse {
    user?: User;
    error?: ResponseError
}