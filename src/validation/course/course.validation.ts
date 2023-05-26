import { boolean, number, object, string } from "yup";
import "yup-phone-lite";
import {
    ICreateCourseRequest,
    IEditCourseRequest,
    ISearchCoursesRequest,
} from "../../interfaces/requests.interface";

const createCourseSchema = object({
    title: string().min(5).max(50).required(),
    teacher_name: string().min(5).max(50).required(),
    description: string().required(),
    isActive: boolean().default(true).required(),
    schoolId: number().min(0).required(),
    pricePerSession: number().min(0).required(),
    monthlyPrice: number().min(0).required(),
    moduleId: number().min(0).optional(),
    nonAcademicTypeId: number().min(0).optional(),
}).test("xor", `either one of moduleId or nonAcademicTypeId has to be provided`, (course) => {
    return !!course.moduleId !== !!course.nonAcademicTypeId!;
});

const editCourseSchema = object({
    title: string().min(5).max(50).optional(),
    teacher_name: string().min(5).max(50).optional(),
    description: string().optional(),
    isActive: boolean().optional(),
    schoolId: number().min(0).optional(),
    pricePerSession: number().min(0).optional(),
    monthlyPrice: number().min(0).optional(),
    moduleId: number().min(0).optional(),
    nonAcademicTypeId: number().min(0).optional(),
}).test("xor", `either one of moduleId or nonAcademicTypeId has to be provided`, (course) => {
    return !(!!course.moduleId && !!course.nonAcademicTypeId!);
});

const searchCoursesSchema = object({
    title: string().min(5).max(50).optional(),
    teacher_name: string().min(5).max(50).optional(),
    description: string().optional(),
    isActive: boolean().optional(),
    schoolId: number().min(0).optional(),
    pricePerSessionStart: number().min(0).optional(),
    pricePerSessionEnd: number().min(0).optional(),
    monthlyPriceStart: number().min(0).optional(),
    monthlyPriceEnd: number().min(0).optional(),
    moduleId: number().min(0).optional(),
    nonAcademicTypeId: number().min(0).optional(),
    cityId: number().min(0).optional(),
    provinceId: number().min(0).optional(),
    countryId: number().min(0).optional(),
}).test("xor", `either one of moduleId or nonAcademicTypeId has to be provided`, (course) => {
    return !(!!course.moduleId && !!course.nonAcademicTypeId!);
});

export function validateCreateCourse(createCourseReq: ICreateCourseRequest) {
    return createCourseSchema.validate(createCourseReq);
}

export function validateEditCourse(editCourseReq: IEditCourseRequest) {
    return editCourseSchema.validate(editCourseReq);
}

export function validateSearchCourses(searchCourseReq: ISearchCoursesRequest) {
    return searchCoursesSchema.validate(searchCourseReq);
}
