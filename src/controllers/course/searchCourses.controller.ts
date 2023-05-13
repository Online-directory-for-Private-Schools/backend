import { Request, Response } from "express";
import { ISearchCoursesRequest } from "../../interfaces/requests.interface";
import { isNumber } from "class-validator";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import isNumeric from "../../utils/isNumeric.util";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";
import xor from "../../utils/xor.util";
import { searchCoursesService } from "../../services/course/searchCourses.service";

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
    }



    if (!page) {
        page = 1;
    }

    if (!limit) {
        limit = 20;
    }

    if (!isNumber(+page!) || !isNumber(+limit!)) {
        return sendErrorResponse("page and limit must be numbers", 400, res);
    }


    if(isActive !== undefined) {
        if(!["true", "false"].includes(isActive as string)) {
            return sendErrorResponse("isActive has to be a boolean", 400, res);
        }

        // convert isActive to a real boolean
        isActive = isActive === "true"
    }

    if (cityId) {
        if (!isNumeric(cityId.toString())) {
            return sendErrorResponse("cityId must be numeric", 400, res);
        }
    }

    if (provinceId) {
        if (!isNumeric(provinceId.toString())) {
            return sendErrorResponse("provinceId must be numeric", 400, res);
        }
    }

    if (countryId) {
        if (!isNumeric(countryId.toString())) {
            return sendErrorResponse("countryId must be numeric", 400, res);
        }
    }

    if (pricePerSessionEnd) {
        if (!isNumeric(pricePerSessionEnd.toString())) {
            return sendErrorResponse("pricePerSessionEnd must be numeric", 400, res);
        }
    }

    if (pricePerSessionStart) {
        console.log(isNumeric(pricePerSessionStart.toString()))
        if (!isNumeric(pricePerSessionStart.toString())) {
            return sendErrorResponse("pricePerSessionStart must be numeric", 400, res);
        }
    }

    if(pricePerSessionEnd && pricePerSessionStart) {
        if(pricePerSessionStart > pricePerSessionEnd) {
            return sendErrorResponse("pricePerSessionStart must be less or equal to pricePerSessionEnd", 400, res);
        }
    }

    if(monthlyPriceEnd && monthlyPriceStart) {
        if(monthlyPriceStart > monthlyPriceEnd) {
            return sendErrorResponse("monthlyPriceStart must be less or equal to monthlyPriceEnd", 400, res);
        }
    }

    if (monthlyPriceStart) {
        if (!isNumeric(monthlyPriceStart.toString())) {
            return sendErrorResponse("monthlyPriceStart must be numeric", 400, res);
        }
    }

    if (monthlyPriceEnd) {
        if (!isNumeric(monthlyPriceEnd.toString())) {
            return sendErrorResponse("monthlyPriceEnd must be numeric", 400, res);
        }
    }

    if (schoolId) {
        if (!isNumeric(schoolId.toString())) {
            return sendErrorResponse("schoolId must be numeric", 400, res);
        }
    }


    if(moduleId && nonAcademicTypeId) {
        return sendErrorResponse("only one of moduleId or nonAcademicTypeId shall be provided", 400, res);
    }

    if(moduleId) {
        if(!Number(moduleId)) {
            return sendErrorResponse("moduleId has to be a number", 400, res);
        }
    }

    if(nonAcademicTypeId) {
        if(!Number(nonAcademicTypeId)) {
            return sendErrorResponse("nonAcademicTypeId has to be a number", 400, res);
        }
    }

    const filteredCourseObject = filterObjectFromFalsyValues(courseInfo)


    try {
        const { data, error } = await searchCoursesService({...filteredCourseObject, limit: +limit, page: +page});

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
