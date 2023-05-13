import { ModuleStream } from "../../db/entities/schoolLevels/ModuleStreamEntity";
import { IHighschoolSpecsResponse } from "../../interfaces/responses.interface";

export default async function getHighschoolSpecialitiesService(): Promise<IHighschoolSpecsResponse> {
    const specialities = await ModuleStream.find();

    return { specialities };
}
