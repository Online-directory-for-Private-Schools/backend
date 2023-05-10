import { AppDataSource } from "../../../data-source";
import { PrivateSchool } from "../../../db/entities/PrivateSchoolEntity";
import { SchoolService } from "../../../interfaces/school.interface";

interface SchoolInfo {
    id: number;
}

export default async function getExistingSchool(
    info: SchoolInfo,
    getOwner = true
): Promise<SchoolService> {
    const { id } = info;

    const schoolExists = await AppDataSource.getRepository(PrivateSchool).findOne({
        where: { id },
        relations: {
            owner: getOwner,
        },
    });

    if (!schoolExists) {
        return {
            error: {
                message: "school with the provided id not found",
            },
        };
    }

    return {
        school: schoolExists,
    };
}
