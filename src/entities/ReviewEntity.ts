import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./StudentEntity";
import { PrivateSchool } from "./PrivateSchoolEntity";

@Entity()
export class Review {


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
        () => Student
    )
    student: Student;

    @ManyToOne(
        () => PrivateSchool,
        PrivateSchool => PrivateSchool.reviews
    )
    school: PrivateSchool;


   
}