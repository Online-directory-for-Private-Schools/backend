import { Student } from "../db/entities/StudentEntity";


export interface CreateStudentService {
    student?: Student
    error?: {
        message: string;
    }
}

