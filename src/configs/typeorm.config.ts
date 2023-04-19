import { User } from "../entities/UserEntity";
import { Auth } from "../entities/AuthEntity";
import { Course } from "../entities/CourseEntity";
import { Photo } from "../entities/PhotoEntity";
import { PrivateSchool } from "../entities/PrivateSchoolEntity";
import { Review } from "../entities/ReviewEntity";
import { Schedule } from "../entities/ScheduleEntity";
import { Student } from "../entities/StudentEntity";
import { DataSourceOptions } from "typeorm";

export const typeOrmDataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    synchronize: true,
    logging: true,
    entities: [Photo, PrivateSchool, Course, Review, Student, Schedule, Auth, User],
    subscribers: [],
    migrations: ["src/migrations/**/*.ts"]
}


