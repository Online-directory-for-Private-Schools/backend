import { SchoolLevel } from "../../db/entities/schoolLevels/SchoolLevelEntity";
import { SchoolYear } from "../../db/entities/schoolLevels/SchoolYearEntity";
import { ISchoolYearResponse } from "../../interfaces/responses.interface";
import makeRespErrorUtil from "../../utils/makeRespError.util";

export default async function getSchoolYearsService(levelId: number, isEager: boolean = false): Promise<ISchoolYearResponse> {
    const levelExists = await SchoolLevel.findOneBy({ id: levelId });

    if (!levelExists) {
        return makeRespErrorUtil("there is no level with the provided id");
    }

    const schoolYears = await SchoolYear.find({
        where: {
            level: {
                id: levelId,
            },
        },
        relations: isEager ? {
            modules: {
                stream: true
            }
        }: undefined
    });

    return { schoolYears };
}
