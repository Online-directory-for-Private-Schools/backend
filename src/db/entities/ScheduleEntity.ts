import { IsDate } from "class-validator";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./CourseEntity";

@Entity("schedules")
export class Schedule extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    start_time: string;

    @Column()
    end_time: string;

    @Column()
    day: string;

    @ManyToOne(
        () => Course,
        (course) => course.schedules,
        {
            onDelete: "CASCADE"
        }
    )
    course: Course;
}