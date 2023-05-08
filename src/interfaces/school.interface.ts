import { PrivateSchool } from "../db/entities/PrivateSchoolEntity";
import { IResponseError } from "./responseError.interface";
import { ISearchSchoolsResponse } from "./responses.interface";

export interface SchoolService {
    school?: PrivateSchool;
    error?: IResponseError;
}

export interface SearchSchoolsService extends ISearchSchoolsResponse {}
