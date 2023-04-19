import { User } from "../db/entities/UserEntity";
import { Auth } from "../db/entities/AuthEntity";
import { Course } from "../db/entities/CourseEntity";
import { Photo } from "../db/entities/PhotoEntity";
import { PrivateSchool } from "../db/entities/PrivateSchoolEntity";
import { Review } from "../db/entities/ReviewEntity";
import { Schedule } from "../db/entities/ScheduleEntity";
import { Student } from "../db/entities/StudentEntity";
import { DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

export const typeOrmDataSourceOptions: DataSourceOptions & SeederOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    synchronize: true,
    logging: true,
    entities: [Photo, PrivateSchool, Course, Review, Student, Schedule, Auth, User],
    subscribers: [],
    migrations: ["src/db/migrations/**/*.{ts,js}"],

    seeds: ["src/db/seeds/**/*.{ts,js}"],
    factories: ["src/db/factories/**/*.{ts,js}"],
}

