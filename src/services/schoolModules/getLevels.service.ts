import { SchoolLevel } from "../../db/entities/schoolLevels/SchoolLevelEntity";
import { ILevelsResponse } from "../../interfaces/responses.interface";

export default async function getLevelsService(eager: boolean = false): Promise<ILevelsResponse> {
    const levels = await SchoolLevel.find({
        relations: eager
            ? {
                  years: {
                      modules: true,
                  },
              }
            : undefined,
    });

    return { levels };
}
