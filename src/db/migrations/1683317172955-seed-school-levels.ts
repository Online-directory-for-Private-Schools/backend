import { MigrationInterface, QueryRunner } from "typeorm";
import data from "../seedingData/school_levels.json";
import { SchoolLevel, SchoolLevelsEnum } from "../entities/schoolLevels/SchoolLevelEntity";
import { ModuleStream } from "../entities/schoolLevels/ModuleStreamEntity";
import { SchoolModule } from "../entities/schoolLevels/SchoolModuleEntity";
import { SchoolYear } from "../entities/schoolLevels/SchoolYearEntity";

interface IModule {
    module_name: string;
    module_name_fr: string;
    module_name_ar: string;
    level: number;
    year: number;
    speciality: string;
    speciality_fr: string;
    speciality_ar: string;
}

let seedingModules = data as IModule[];

export class SeedSchoolLevels1683317172955 implements MigrationInterface {
    private async seedLevelsAndYears(queryRunner: QueryRunner): Promise<void> {
        const levels = [
            SchoolLevelsEnum.PRIMARY_SCHOOL,
            SchoolLevelsEnum.MIDDLE_SCHOOL,
            SchoolLevelsEnum.HIGH_SCHOOL,
        ].map((level) => {
            return queryRunner.manager.create<SchoolLevel>(SchoolLevel, {
                level,
            });
        });

        let years: SchoolYear[] = [];

        await queryRunner.manager.save(levels);


        // create primary school level years
        for (let i = 0; i <= 5; i++) {
            const year = queryRunner.manager.create(SchoolYear, {
                level: levels[0],
                year: i,
            });

            years.push(year);
        }

        // create middle school level years
        for (let i = 1; i <= 4; i++) {
            const year = queryRunner.manager.create(SchoolYear, {
                level: levels[1],
                year: i,
            });

            years.push(year);
        }

        // create high school level years
        for (let i = 1; i <= 3; i++) {
            const year = queryRunner.manager.create(SchoolYear, {
                level: levels[2],
                year: i,
            });

            years.push(year);
        }

        await queryRunner.manager.save(years);
    }

    private async seedModules(queryRunner: QueryRunner): Promise<void> {
        await Promise.all(
            seedingModules.map(async (module) => {
                // get the year of the current module

                // get the speciality of the current module

                // if they exist, create and save the module

                const year = await queryRunner.manager.findOneBy(SchoolYear, {
                    level: {
                        level: module.level
                    },
                    year: module.year
                });

                const speciality = await queryRunner.manager.findOneBy(ModuleStream, {
                    name: module.speciality,
                });

                if (year) {
                    const createdModule = queryRunner.manager.create<SchoolModule>(SchoolModule, {
                        name: module.module_name,
                        name_ar: module.module_name_ar,
                        name_fr: module.module_name_fr,
                        year: year,
                        stream: speciality!, // if speciality is null, it's ok, it means the current module is not a high school module
                    });

                    await queryRunner.manager.save(createdModule);
                }
            })
        );
    }

    private async seedHighSchoolSpecialities(queryRunner: QueryRunner): Promise<void> {
        interface ISpeciality {
            name: string;
            name_ar: string;
            name_fr: string;
        }

        let specialities: ISpeciality[] = [];

        // adding specialities data to the specialities set
        seedingModules.forEach(({ speciality: name, speciality_ar, speciality_fr }) => {
            if(!specialities.some(spec => spec.name === name)) {
                specialities.push({
                    name: name,
                    name_ar: speciality_ar,
                    name_fr: speciality_fr,
                });
            }
        });

        Promise.all(
            Array.from(specialities).map(async ({ name, name_ar, name_fr }) => {
                // create speciality
                const speciality = queryRunner.manager.create(ModuleStream, {
                    name,
                    name_ar,
                    name_fr,
                });

                await queryRunner.manager.save(speciality)
            })
        );
    }


    public async up(queryRunner: QueryRunner): Promise<void> {
        // !WARN: this order is important
        await this.seedLevelsAndYears(queryRunner);
        await this.seedHighSchoolSpecialities(queryRunner);
        await this.seedModules(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // deleting levels will delete everything else bcs of cascade deletion

        let levels = await queryRunner.manager.getRepository(SchoolLevel).find();
        let hsSpecs = await queryRunner.manager.getRepository(ModuleStream).find();


        await queryRunner.manager.remove(levels);
        await queryRunner.manager.remove(hsSpecs);

    }
}
