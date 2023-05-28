import { Request, Response } from "express";
import { ISearchCoursesRequest } from "../../interfaces/requests.interface";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";
import { searchCoursesService } from "../../services/course/searchCourses.service";
import { validateSearchCourses } from "../../validation/course/course.validation";
import { ValidationError } from "yup";

export default async function searchCoursesController(req: Request, res: Response) {
    // define price ranges
    // cityId, provinceId, countryId

    let {
        description,
        isActive,
        limit,
        moduleId,
        monthlyPriceEnd,
        monthlyPriceStart,
        nonAcademicTypeId,
        page,
        pricePerSessionEnd,
        pricePerSessionStart,
        schoolId,
        teacher_name,
        title,
        countryId,
        cityId,
        provinceId,
    }: ISearchCoursesRequest = req.query;

    const courseInfo = {
        description,
        isActive,
        limit,
        moduleId,
        monthlyPriceEnd,
        monthlyPriceStart,
        nonAcademicTypeId,
        page,
        pricePerSessionEnd,
        pricePerSessionStart,
        schoolId,
        teacher_name,
        title,
        countryId,
        cityId,
        provinceId,
    };

    let validatedBody: ISearchCoursesRequest;

    try {
        validatedBody = await validateSearchCourses(filterObjectFromFalsyValues(courseInfo));
    } catch (error) {
        if (error instanceof ValidationError) {
            return sendErrorResponse(error.errors[0], 400, res);
        }

        return sendErrorResponse("an error occured while validating data", 500, res);
    }

    const filteredCourseObject = filterObjectFromFalsyValues(validatedBody);

    try {
        const { data, error } = await searchCoursesService(filteredCourseObject);

        // error checking
        if (error || !data) {
            return sendErrorResponse(error?.message!, 500, res);
        }

        const resp = { data };

        return res.json(resp);
    } catch (error) {
        console.log(error);
        // TODO: [SEG310-86] handle error types
        return sendErrorResponse("an error occured while searching for schools", 500, res);
    }
}
