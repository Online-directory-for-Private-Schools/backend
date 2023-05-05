import { MigrationInterface, QueryRunner } from "typeorm";
import { Country } from "../entities/Address/CountryEntity";
import { Province } from "../entities/Address/ProvinceEntity";
import { City } from "../entities/Address/CityEntity";
import data from "../seedingData/algeria_cities.json";

interface SeedingCity {
    id: number;
    commune_name: string;
    daira_name: string;
    wilaya_code: string;
    wilaya_name: string;
}

export class SeedAddresses1683198215375 implements MigrationInterface {
    private async seedCountries(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.save(
            queryRunner.manager.create<Country>(Country, {
                name: "Algeria",
            })
        );
    }

    private async seedProvinces(
        queryRunner: QueryRunner,
        citiesData: SeedingCity[]
    ): Promise<void> {
        let wilayasSet = new Set<string>();

        citiesData.forEach((city) => {
            wilayasSet.add(city.wilaya_name);
        });

        const algeria = await queryRunner.manager.findOneBy(Country, {
            name: "Algeria",
        });

        await Promise.all(
            Array.from(wilayasSet).map(async (wilaya) => {
                const province = queryRunner.manager.create<Province>(Province, {
                    name: wilaya,
                    country: algeria!,
                });
                await queryRunner.manager.save(province);
            })
        );
    }

    private async seedCities(queryRunner: QueryRunner, citiesData: SeedingCity[]): Promise<void> {
        Promise.all(
            citiesData.map(async (city) => {
                // get wilaya
                const wilaya = await queryRunner.manager.getRepository(Province).findOneBy({
                    name: city.wilaya_name,
                });

                if (wilaya) {
                    // create and  save city
                    const createdCity = queryRunner.manager.create<City>(City, {
                        name: city.commune_name,
                        province: wilaya,
                    });

                    await queryRunner.manager.save(createdCity);
                }
            })
        );
    }

    public async up(queryRunner: QueryRunner): Promise<void> {
        let citiesData = data as SeedingCity[];

        await this.seedCountries(queryRunner);
        await this.seedProvinces(queryRunner, citiesData);
        this.seedCities(queryRunner, citiesData);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        let countries = await queryRunner.manager.getRepository(Country).find();

        // deleting countries will also delete all provinces and cities
        await queryRunner.manager.remove(countries);
    }
}
