import { City } from "../db/entities/Address/CityEntity";
import { Country } from "../db/entities/Address/CountryEntity";
import { Province } from "../db/entities/Address/ProvinceEntity";
import { PrivateSchool } from "../db/entities/PrivateSchoolEntity";
import { Student } from "../db/entities/StudentEntity";
import { User } from "../db/entities/UserEntity";
import { ResponseError } from "./responseError.interface";

export interface SchoolResponse {
    school?: PrivateSchool;
    error?: ResponseError
}

export interface SearchSchoolsResponse {
    data?: {
        schools?: PrivateSchool[];
        currentPage?: number;
        totalPages?: number;
        totalSchools?: number;
    }
    error?: ResponseError;
}



export interface CreateStudentResponse {
    student?: Student;
    error?: ResponseError
}


export interface AuthResponse {
    user?: User;
    error?: ResponseError
    token?: string
}


export interface GetUserResponse extends AuthResponse {}

export interface DeleteResponse {
    info?: string;
    error?: ResponseError
}

export interface CountriesResponse {
    countries?: Country[];
    error?: ResponseError;
}

export interface ProvincesResponse {
    provinces?: Province[];
    error?: ResponseError;
}

export interface CitiesResponse {
    cities?: City[];
    error?: ResponseError;
}