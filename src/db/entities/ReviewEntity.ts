import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PrivateSchool } from "./PrivateSchoolEntity";
import { Student } from "./StudentEntity";

@Entity("reviews")
export class Review extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "float"
    })
    rating: number;

    @Column({
        nullable: true
    })
    comment: string;

    @Column({
        type: "timestamp"
    })
    timestamp: Date;


    @ManyToOne(
        () => Student,
        {
            cascade: true
        }
    )
    student: Student;

    @ManyToOne(
        () => PrivateSchool,
        PrivateSchool => PrivateSchool.reviews,
        {
            cascade: true
        }

    )
    school: PrivateSchool;


   
}