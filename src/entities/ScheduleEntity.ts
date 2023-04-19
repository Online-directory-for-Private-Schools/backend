import { IsDate } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./CourseEntity";

@Entity("schedules")
export class Schedule {
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
            cascade: true
        }
    )
    course: Course;
}