import { City } from "../db/entities/Address/CityEntity";
import { Country } from "../db/entities/Address/CountryEntity";
import { Province } from "../db/entities/Address/ProvinceEntity";
import { Course } from "../db/entities/Course/CourseEntity";
import { PrivateSchool } from "../db/entities/PrivateSchoolEntity";
import { Student } from "../db/entities/StudentEntity";
import { User } from "../db/entities/UserEntity";
import { IResponseError } from "./responseError.interface";

export interface ISchoolResponse {
    school?: PrivateSchool;
    error?: IResponseError
}

export interface ISearchSchoolsResponse {
    data?: {
        schools?: PrivateSchool[];
        currentPage?: number;
        totalPages?: number;
        totalSchools?: number;
    }
    error?: IResponseError;
}

export interface ISearchCoursesResponse {
    data?: {
        courses?: Course[];
        currentPage?: number;
        totalPages?: number;
        totalCourses?: number;
    }
    error?: IResponseError;
}




export interface ICreateStudentResponse {
    student?: Student;
    error?: IResponseError
}


export interface IAuthResponse {
    user?: User;
    error?: IResponseError
    token?: string
}


export interface IGetUserResponse extends IAuthResponse {}

export interface IDeleteResponse {
    info?: string;
    error?: IResponseError
}

export interface ICountriesResponse {
    countries?: Country[];
    error?: IResponseError;
}

export interface IProvincesResponse {
    provinces?: Province[];
    error?: IResponseError;
}

export interface ICitiesResponse {
    cities?: City[];
    error?: IResponseError;
}

export interface ICourseResponse {
    course?: Course,
    error?: IResponseError
}