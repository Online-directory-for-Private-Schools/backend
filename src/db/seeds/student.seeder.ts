import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Student } from '../entities/StudentEntity';


export default class StudentSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {

        const studentFactory = factoryManager.get(Student);

        // save 5 factory generated entities, to the database
        await studentFactory.saveMany(50);
    }
}