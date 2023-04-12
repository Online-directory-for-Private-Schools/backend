import { typeOrmDataSourceOptions } from "./configs/typeorm.config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource(typeOrmDataSourceOptions)

