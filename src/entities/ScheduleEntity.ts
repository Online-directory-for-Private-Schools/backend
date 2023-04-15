import { IsDate } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./CourseEntity";

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn({
        type: "numeric"
    })
    id: string;

    @Column()
    start_time: string;

    @Column()
    end_time: string;

    @Column()
    day: string;

    @ManyToOne(
        () => Course,
        (course) => course.schedules
    )
    course: Course;
}