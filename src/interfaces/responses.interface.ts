import { City } from "../db/entities/Address/CityEntity";
import { Country } from "../db/entities/Address/CountryEntity";
import { Province } from "../db/entities/Address/ProvinceEntity";
import { Course } from "../db/entities/Course/CourseEntity";
import { PrivateSchool } from "../db/entities/PrivateSchoolEntity";
import { Schedule } from "../db/entities/ScheduleEntity";
import { Student } from "../db/entities/StudentEntity";
import { User } from "../db/entities/UserEntity";
import { ModuleStream } from "../db/entities/schoolLevels/ModuleStreamEntity";
import { SchoolLevel } from "../db/entities/schoolLevels/SchoolLevelEntity";
import { SchoolModule } from "../db/entities/schoolLevels/SchoolModuleEntity";
import { SchoolYear } from "../db/entities/schoolLevels/SchoolYearEntity";
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



export interface ILevelsResponse {
    levels?: SchoolLevel[]
    error?: IResponseError;
}


export interface ISchoolYearResponse {
    schoolYears?: SchoolYear[]
    error?: IResponseError;
}

export interface IModulesResponse {
    modules?: SchoolModule[]
    error?: IResponseError;
}

export interface IHighschoolSpecsResponse {
    specialities?: ModuleStream[]
    error?: IResponseError;
}

export interface ICourseScheduleResponse {
    schedule?: Schedule,
    error?: IResponseError
}

export interface ICourseSchedulesResponse {
    schedules?: Schedule[],
    error?: IResponseError
}

export interface IUserVerificationResponse {
    info?: string;
    error?: IResponseError
}


export interface IChangeAuthInfoResponse {
    info?: string;
    error?: IResponseError;
}


export interface IGetUserSchoolsResponse {
    schools?: PrivateSchool[],
    error?: IResponseError
}