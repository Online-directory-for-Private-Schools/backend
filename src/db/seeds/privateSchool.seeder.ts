import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PrivateSchool } from '../entities/PrivateSchoolEntity';


export default class PrivateSchoolSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {

        const privateSchoolFactory = factoryManager.get(PrivateSchool);

        // save 5 factory generated entities, to the database
        await privateSchoolFactory.saveMany(50);
    }
}