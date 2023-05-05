import { Request } from "express";
import { UserType } from "../db/entities/UserEntity";


export interface EditUserRequest {
    id: string;
    name?: string;
    phone_number?: string;
    cityId?: number
}


export interface LoginRequest {
    email: string;
    password: string;
}


export interface RegisterRequest extends LoginRequest {
    name: string;
    phone_number?: string;
    type: UserType;
    cityId: number;
}

export interface CreateSchoolRequest {
    name: string;
    bio?: string;
    isHiring?: boolean;
    lng: string;
    lat: string;
    cityId: number;
    street_name: string;
    userId: string;
}

export interface GetSchoolRequest {
    id: number
}


export interface EditSchoolRequest {
    id: number;
    name?: string;
    bio?: string;
    isHiring?: boolean;
    cityId?: number;
    streetName?: string;
    lat?: string;
    lng?: string;
}


export interface SearchSchoolsRequest {
    name?: string;
    cityId?: number;
    countryId?: number;
    provinceId?: number;
    isHiring?: boolean;
    limit?: number;
    page?: number;
}


export interface CreateStudentRequest {
    city: string
    province: string
    country: string
    userId: string
}


export interface AuthRequest extends Request {
    authUser: {
        id: string;
    }
}