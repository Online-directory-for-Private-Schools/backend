import { SchoolModule } from "../../db/entities/schoolLevels/SchoolModuleEntity";
import { SchoolYear } from "../../db/entities/schoolLevels/SchoolYearEntity";
import { IModulesResponse } from "../../interfaces/responses.interface";
import makeRespErrorUtil from "../../utils/makeRespError.util";

export default async function getModulesService(yearId: number): Promise<IModulesResponse> {
    const yearExists = await SchoolYear.findOneBy({id: yearId});

    if(!yearExists) {
        return makeRespErrorUtil("there is no year with the provided id");
    }

    const modules = await SchoolModule.find({
        where: {
            year: {
                id: yearId
            }
        }
    })

    return {modules}

}