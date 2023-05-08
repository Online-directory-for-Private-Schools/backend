import { Student } from "../db/entities/StudentEntity";
import { User } from "../db/entities/UserEntity";
import { IResponseError } from "./responseError.interface";

export interface AuthService {
    user?: User
    error?: IResponseError
}


export interface UserService extends AuthService {

}


export interface DeleteUserService {
    error?: IResponseError
}

