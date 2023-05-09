"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmDataSourceOptions = void 0;
const UserEntity_1 = require("../db/entities/UserEntity");
const AuthEntity_1 = require("../db/entities/AuthEntity");
const CourseEntity_1 = require("../db/entities/CourseEntity");
const PhotoEntity_1 = require("../db/entities/PhotoEntity");
const PrivateSchoolEntity_1 = require("../db/entities/PrivateSchoolEntity");
const ReviewEntity_1 = require("../db/entities/ReviewEntity");
const ScheduleEntity_1 = require("../db/entities/ScheduleEntity");
exports.typeOrmDataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    synchronize: false,
    logging: true,
    entities: [PhotoEntity_1.Photo, PrivateSchoolEntity_1.PrivateSchool, CourseEntity_1.Course, ReviewEntity_1.Review, ScheduleEntity_1.Schedule, AuthEntity_1.Auth, UserEntity_1.User],
    subscribers: [],
    migrations: ["src/db/migrations/**/*.{ts,js}"],
    seeds: ["src/db/seeds/**/*.{ts,js}"],
    factories: ["src/db/factories/**/*.{ts,js}"],
};
//# sourceMappingURL=typeorm.config.js.map