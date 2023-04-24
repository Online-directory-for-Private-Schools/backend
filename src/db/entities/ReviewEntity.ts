import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PrivateSchool } from "./PrivateSchoolEntity";
import { User } from "./UserEntity";

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
        () => User,
        {
            onDelete: "CASCADE"
        }
    )
    user: User;

    @ManyToOne(
        () => PrivateSchool,
        PrivateSchool => PrivateSchool.reviews,
        {
            onDelete: "CASCADE"
        }

    )
    school: PrivateSchool;


   
}