import { DataSourceOptions } from "typeorm";

export const typeOrmDataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
}