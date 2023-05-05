import { ChildEntity, ManyToOne } from "typeorm";
import { SchoolModule } from "../schoolLevels/SchoolModuleEntity";
import { Course } from "./CourseEntity";

@ChildEntity()
export class AcademicCourse extends Course {
    @ManyToOne(() => SchoolModule, {
        onDelete: "CASCADE",
    })
    module: SchoolModule;
}
