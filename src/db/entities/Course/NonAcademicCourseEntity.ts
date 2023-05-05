import { ChildEntity, ManyToOne } from "typeorm";
import { Course } from "./CourseEntity";
import { NonAcademicCourseTypes } from "../schoolLevels/NonAcademicCourseType";

@ChildEntity()
export class NonAcademicCourse extends Course {
    @ManyToOne(() => NonAcademicCourseTypes, {
        onDelete: "CASCADE",
    })
    nonAcademicType: NonAcademicCourseTypes;
}
