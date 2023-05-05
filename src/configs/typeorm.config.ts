import { User } from "../db/entities/UserEntity";
import { Auth } from "../db/entities/AuthEntity";
import { Course } from "../db/entities/Course/CourseEntity";
import { Photo } from "../db/entities/PhotoEntity";
import { PrivateSchool } from "../db/entities/PrivateSchoolEntity";
import { Review } from "../db/entities/ReviewEntity";
import { Schedule } from "../db/entities/ScheduleEntity";
import { Student } from "../db/entities/StudentEntity";
import { DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { City } from "../db/entities/Address/CityEntity";
import { Country } from "../db/entities/Address/CountryEntity";
import { Province } from "../db/entities/Address/ProvinceEntity";
import { StreetAddress } from "../db/entities/Address/StreetAddressEntity";
import { ModuleStream } from "../db/entities/schoolLevels/ModuleStreamEntity";
import { SchoolLevel } from "../db/entities/schoolLevels/SchoolLevelEntity";
import { SchoolYear } from "../db/entities/schoolLevels/SchoolYearEntity";
import { SchoolModule } from "../db/entities/schoolLevels/SchoolModuleEntity";
import { NonAcademicCourse } from "../db/entities/Course/NonAcademicCourseEntity";
import { AcademicCourse } from "../db/entities/Course/AcademicCourseEntity";
import { NonAcademicCourseTypes } from "../db/entities/schoolLevels/NonAcademicCourseType";

export const typeOrmDataSourceOptions: DataSourceOptions & SeederOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    synchronize: true,
    logging: true,
    entities: [Photo, PrivateSchool, Course, Review, Schedule, Auth, User, City, Country, Province, StreetAddress, ModuleStream, SchoolLevel, SchoolYear, SchoolModule, NonAcademicCourse, AcademicCourse, NonAcademicCourseTypes],
    subscribers: [],
    migrations: ["src/db/migrations/**/*.{ts,js}"],

    seeds: ["src/db/seeds/**/*.{ts,js}"],
    factories: ["src/db/factories/**/*.{ts,js}"],
}

