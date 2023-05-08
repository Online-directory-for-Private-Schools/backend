import { Request } from "express";
import { UserType } from "../db/entities/UserEntity";


export interface IEditUserRequest {
    id: string;
    name?: string;
    phone_number?: string;
    cityId?: number
}


export interface ILoginRequest {
    email: string;
    password: string;
}


export interface IRegisterRequest extends ILoginRequest {
    name: string;
    phone_number?: string;
    type: UserType;
    cityId: number;
}

export interface ICreateSchoolRequest {
    name: string;
    bio?: string;
    isHiring?: boolean;
    lng: string;
    lat: string;
    cityId: number;
    street_name: string;
    userId: string;
}

export interface IGetSchoolRequest {
    id: number
}


export interface IEditSchoolRequest {
    name?: string;
    bio?: string;
    isHiring?: boolean;
    cityId?: number;
    streetName?: string;
    lat?: string;
    lng?: string;
}



export enum ISearchOrderEnum {
    ASCENDING="asc",
    DESCENDING="desc"
}


export interface ISearchProps {
    limit?: number;
    page?: number;
}

export interface ISearchSchoolsRequest extends ISearchProps {
    name?: string;
    cityId?: number;
    countryId?: number;
    provinceId?: number;
    isHiring?: boolean;
}



export interface ICreateStudentRequest {
    city: string
    province: string
    country: string
    userId: string
}


export interface IAuthRequest extends Request {
    authUser: {
        id: string;
    }
}



export interface ISearchCoursesRequest extends ISearchProps {
    title?: string;
    teacher_name?: string;
    description?: string;
    isActive?: boolean;
    schoolId?: number;
    pricePerSessionStart?: number;
    pricePerSessionEnd?: number;
    monthlyPriceStart?: number;
    monthlyPriceEnd?: number;
    moduleId?: number;
    nonAcademicTypeId?: number;
    cityId?: number;
    provinceId?: number;
    countryId?: number;
}

export interface ICreateCourseRequest {
    title: string;
    teacher_name: string;
    description: string;
    isActive: boolean;
    schoolId: number;
    pricePerSession: number;
    monthlyPrice: number;
    moduleId?: number;
    nonAcademicTypeId?: number;
}


export interface IEditCourseRequest {
    title?: string;
    teacher_name?: string;
    description?: string;
    isActive?: boolean;
    pricePerSession?: number;
    monthlyPrice?: number;
    moduleId?: number;
    nonAcademicTypeId?: number;
}