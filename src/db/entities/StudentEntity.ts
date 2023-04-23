import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UserEntity";

@Entity("students")
export class Student extends BaseEntity { 

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    city: string;

    @Column()
    province: string;

    @Column()
    country: string;

    @OneToOne(
        () => User,
        {
            onDelete: "CASCADE",
        }
    )
    @JoinColumn()
    user: User;

}
