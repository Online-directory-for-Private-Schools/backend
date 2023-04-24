import { Student } from "../db/entities/StudentEntity";
import { User } from "../db/entities/UserEntity";
import { ResponseError } from "./responseError.interface";

export interface AuthService {
    user?: User
    error?: ResponseError
}


export interface UserService extends AuthService {

}


export interface DeleteUserService {
    error?: ResponseError
}

