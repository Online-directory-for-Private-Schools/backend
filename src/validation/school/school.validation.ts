import { boolean, number, object, string } from "yup";
import "yup-phone-lite";
import {
    ICreateSchoolRequest,
    IEditSchoolRequest,
    ISearchSchoolsRequest,
} from "../../interfaces/requests.interface";


const numericStringRegex = /^-?\d+\.?\d*$/;

const createSchoolSchema = object({
    name: string().min(5).max(50).trim().required(),
    bio: string().trim().optional(),
    isHiring: boolean().default(false).required(),
    website: string().trim().url().optional(),
    phone_number: string().trim().phone("DZ").required(),
    email: string().email().trim().lowercase().required(),
    lng: string().matches(numericStringRegex, "lng has to be a number").optional(),
    lat: string().matches(numericStringRegex, "lat has to be a number").optional(),
    cityId: number().min(0).required(),
    street_name: string().trim().required(),
    userId: string().uuid().required(),
});

const editSchoolSchema = object({
    id: number().min(0).required(),
    name: string().min(5).max(50).trim().optional(),
    bio: string().trim().optional(),
    isHiring: boolean().default(false).optional(),
    website: string().url().trim().optional(),
    phone_number: string().trim().phone("DZ").optional(),
    email: string().trim().email().lowercase().optional(),
    lng: string().matches(numericStringRegex, "lng has to be a number").optional(),
    lat: string().matches(numericStringRegex, "lat has to be a number").optional(),
    cityId: number().min(0).optional(),
    street_name: string().trim().optional(),
});

const searchSchoolSchema = object({
    name: string().trim().optional(),
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

export function validateEditSchool(editSchoolReq: IEditSchoolRequest | {id: number|string}) {
    return editSchoolSchema.validate(editSchoolReq);
}

export function validateSearchSchools(searchSchoolReq: ISearchSchoolsRequest) {
    return searchSchoolSchema.validate(searchSchoolReq);
}
