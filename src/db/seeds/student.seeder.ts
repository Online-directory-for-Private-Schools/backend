import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/UserEntity';


export default class StudentSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {

        const studentFactory = factoryManager.get(User);

        // save 5 factory generated entities, to the database
        await studentFactory.saveMany(50);
    }
}