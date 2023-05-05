import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("non_academic_course_types")
export class NonAcademicCourseTypes extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
