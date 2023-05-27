import { boolean, number, object, string } from "yup";
import "yup-phone-lite";
import {
    ICreateCourseRequest,
    IEditCourseRequest,
    ISearchCoursesRequest,
} from "../../interfaces/requests.interface";
import xor from "../../utils/xor.util";

const createCourseSchema = object({
    title: string().min(5).max(50).trim().required(),
    teacher_name: string().min(5).max(50).trim().required(),
    description: string().trim().required(),
    isActive: boolean().default(true).required(),
    schoolId: number().min(0).required(),
    pricePerSession: number().min(0).required(),
    monthlyPrice: number().min(0).required(),
    moduleId: number().min(0).optional(),
    nonAcademicTypeId: number().min(0).optional(),
}).test("xor", `either one of moduleId or nonAcademicTypeId has to be provided`, (course) => {
    return xor(course.moduleId === undefined, course.nonAcademicTypeId === undefined);
});

const editCourseSchema = object({
    title: string().min(5).max(50).trim().optional(),
    teacher_name: string().min(5).max(50).trim().optional(),
    description: string().trim().optional(),
    isActive: boolean().optional(),
    schoolId: number().min(0).optional(),
    pricePerSession: number().min(0).optional(),
    monthlyPrice: number().min(0).optional(),
    moduleId: number().min(0).optional(),
    nonAcademicTypeId: number().min(0).optional(),
}).test("xor", `either one of moduleId or nonAcademicTypeId has to be provided`, (course) => {
    return !(course.moduleId !== undefined && course.nonAcademicTypeId !== undefined);
});

const searchCoursesSchema = object({
    title: string().trim().optional(),
    teacher_name: string().trim().optional(),
    description: string().trim().optional(),
    isActive: boolean().optional(),
    schoolId: number().min(0).optional(),
    pricePerSessionStart: number().min(0).default(0).optional(),
    pricePerSessionEnd: number().min(0).default(Infinity).optional(),
    monthlyPriceStart: number().min(0).default(0).optional(),
    monthlyPriceEnd: number().min(0).default(Infinity).optional(),
    moduleId: number().min(0).optional(),
    nonAcademicTypeId: number().min(0).optional(),
    cityId: number().min(0).optional(),
    provinceId: number().min(0).optional(),
    countryId: number().min(0).optional(),
    limit: number().min(1).default(20).optional(),
    page: number().min(1).default(1).optional(),
})
    .test("xor", `either one of moduleId or nonAcademicTypeId has to be provided`, (course) => {
        return !(course.moduleId !== undefined && course.nonAcademicTypeId !== undefined);
    })
    .test("pricePerSession", "pricePerSessionStart has to be less or equal to pricePerSessionend" ,(course) => {
        return course.pricePerSessionStart <= course.pricePerSessionEnd;
    })
    .test("monthlyPrice", "monthlyPriceStart has to be less or equal to monthlyPriceend" ,(course) => {
        return course.monthlyPriceStart <= course.monthlyPriceEnd;
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
