import { PrivateSchool } from "../db/entities/PrivateSchoolEntity";
import { ResponseError } from "./responseError.interface";
import { SearchSchoolsResponse } from "./responses.interface";

export interface SchoolService {
    school?: PrivateSchool;
    error?: ResponseError;
}

export interface SearchSchoolsService extends SearchSchoolsResponse {}
