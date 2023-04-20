import { Student } from "../db/entities/StudentEntity";
import { User } from "../db/entities/UserEntity";

export interface AuthService {
    user?: User
    error?: {
        message: string;
    }
}


