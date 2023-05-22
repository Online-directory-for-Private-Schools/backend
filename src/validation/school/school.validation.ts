import { boolean, number, object, string } from "yup";
import "yup-phone-lite";
import {
    ICreateSchoolRequest,
    IEditSchoolRequest,
    ISearchSchoolsRequest,
} from "../../interfaces/requests.interface";

const createSchoolSchema = object({
    name: string().min(5).max(50).required(),
    bio: string().optional(),
    isHiring: boolean().default(false).required(),
    website: string().url().optional(),
    phone_number: string().phone().required(),
    email: string().email().lowercase().required(),
    lng: string().optional(),
    lat: string().optional(),
    cityId: number().min(0).required(),
    street_name: string().required(),
    userId: string().uuid().required(),
});

const editSchoolSchema = object({
    name: string().min(5).max(50).optional(),
    bio: string().optional(),
    isHiring: boolean().default(false).optional(),
    website: string().url().optional(),
    phone_number: string().phone().optional(),
    email: string().email().lowercase().optional(),
    lng: string().optional(),
    lat: string().optional(),
    cityId: number().min(0).optional(),
    street_name: string().optional(),
});

const searchSchoolSchema = object({
    name: string().min(5).max(50).optional(),
    cityId: number().min(0).optional(),
    provinceId: number().min(0).optional(),
    countryId: number().min(0).optional(),
    isHiring: boolean().default(false).optional(),
    limit: number().min(1).default(20).optional(),
    page: number().min(1).default(1).optional(),
});

export function validateCreateSchool(createSchoolReq: ICreateSchoolRequest) {
    return createSchoolSchema.validate(createSchoolReq);
}

export function validateEditSchool(editSchoolReq: IEditSchoolRequest) {
    return editSchoolSchema.validate(editSchoolReq);
}

export function validateSearchSchools(searchSchoolReq: ISearchSchoolsRequest) {
    return searchSchoolSchema.validate(searchSchoolReq);
}
