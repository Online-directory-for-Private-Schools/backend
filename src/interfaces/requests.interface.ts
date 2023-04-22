import { Request } from "express";
import { UserType } from "../db/entities/UserEntity";

export interface LoginRequest {
    email: string;
    password: string;
}


export interface RegisterRequest extends LoginRequest {
    name: string;
    phone_number?: string;
    type: UserType;
    city: string;
    province: string;
    country: string;
}

export interface CreateSchoolRequest {
    name: string;
    bio?: string;
    isHiring?: boolean;
    lng: string;
    lat: string;
    city: string;
    province: string;
    street_name: string;
    country: string;
    userId: string;
}


export interface CreateStudentRequest {
    city: string
    province: string
    country: string
    userId: string
}


export interface AuthRequest extends Request {
    user: {
        id: string;
    }
}