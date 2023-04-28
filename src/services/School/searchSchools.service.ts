import { Like } from "typeorm";
import { PrivateSchool } from "../../db/entities/PrivateSchoolEntity";
import { SearchSchoolsRequest } from "../../interfaces/requests.interface";
import { SchoolService, SearchSchoolsService } from "../../interfaces/school.interface";
import makeErrorResponseUtil from "./utils/makeErrorResponse.util";



export async function searchSchoolsService(info: SearchSchoolsRequest): Promise<SearchSchoolsService> {
    
    // TODO: [SEG310-88] implement pagination

    const query = {
        ...info,
        name: Like(`%${info.name ? info.name.toLowerCase() : ""}%`),
    }

    // we put `...info` before `name` to override name with the regex pattern
    const schools = await PrivateSchool.find({
        where: query,
        loadEagerRelations: false
    });

    return { schools };

}
