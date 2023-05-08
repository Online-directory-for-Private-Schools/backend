import { Between, FindOptionsWhere, ILike } from "typeorm";
import { ISearchCoursesRequest } from "../../interfaces/requests.interface";
import { ISearchCoursesResponse } from "../../interfaces/responses.interface";
import { Course } from "../../db/entities/Course/CourseEntity";
import { AcademicCourse } from "../../db/entities/Course/AcademicCourseEntity";
import { NonAcademicCourse } from "../../db/entities/Course/NonAcademicCourseEntity";

export async function searchCoursesService(
    courseInfo: ISearchCoursesRequest
): Promise<ISearchCoursesResponse> {
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
    } = courseInfo;

    const validTitle = title ? title.toLowerCase() : "";
    const validTeacherName = teacher_name ? teacher_name.toLowerCase() : "";
    const validDescription = description ? description.toLowerCase() : "";

    
    if (!monthlyPriceStart) {
        monthlyPriceStart = 0;
    }
    
    if (!pricePerSessionStart) {
        pricePerSessionStart = 0;
    }

    if (!pricePerSessionEnd) {
        pricePerSessionEnd = pricePerSessionStart;
    }

    if (!monthlyPriceEnd) {
        monthlyPriceEnd = monthlyPriceStart;
    }

    let query: FindOptionsWhere<AcademicCourse> | FindOptionsWhere<NonAcademicCourse> = {
        title: ILike(`%${validTitle}%`),
        description: ILike(`%${validDescription}%`),
        teacher_name: ILike(`%${validTeacherName}%`)
    };

    if(monthlyPriceEnd + monthlyPriceStart !== 0) {
        query.monthlyPrice = Between(monthlyPriceStart, monthlyPriceEnd)
    } 

    if(pricePerSessionEnd + pricePerSessionStart !== 0) {
        query.pricePerSession = Between(pricePerSessionStart, pricePerSessionEnd)
    } 

    if (isActive !== undefined) {
        query.isActive = isActive;
    }

    

    if (moduleId) {
        query = {
            ...query,
            module: {
                id: moduleId,
            },
        };
    }

    if (nonAcademicTypeId) {
        query = {
            ...query,
            nonAcademicType: {
                id: nonAcademicTypeId,
            },
        };
    }

    if (schoolId) {
        query = {
            ...query,
            school: {},
        };
    }

    if (cityId) {
        query = {
            ...query,
            school: {
                street: {
                    city: {
                        id: cityId,
                    },
                },
            },
        };
    }

    if (provinceId && !cityId) {
        query = {
            ...query,
            school: {
                street: {
                    city: {
                        province: {
                            id: provinceId,
                        },
                    },
                },
            },
        };
    }

    if (countryId && !cityId && !provinceId) {
        query = {
            ...query,
            school: {
                street: {
                    city: {
                        province: {
                            country: {
                                id: countryId,
                            },
                        },
                    },
                },
            },
        };
    }

    let courses: Course[] | NonAcademicCourse[] | AcademicCourse[];

    const relations = {
        school: {
            street: {
                city: {
                    province: {
                        country: true,
                    },
                },
            },
        },
    };

    const paginationOptions = {
        loadEagerRelations: false,
        take: limit,
        skip: (page! - 1) * limit!,
    };

    if (moduleId) {
        courses = await AcademicCourse.find({
            where: query,
            relations: { ...relations, module: true },
            ...paginationOptions,
        });
    } else if (nonAcademicTypeId) {
        courses = await NonAcademicCourse.find({
            where: query,
            relations: { ...relations, nonAcademicType: true },
            ...paginationOptions,
        });
    } else {
        courses = await Course.find({
            where: query,
            ...paginationOptions,
        });
    }

    let totalCoursesCount = await Course.countBy(query);


    return {
        data: {
            courses,
            currentPage: page,
            totalPages: Math.ceil(totalCoursesCount / limit!),
            totalCourses: totalCoursesCount,
        },
    };
}
