import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UserEntity";

@Entity("students")
export class Student { 

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    city: string;

    @Column()
    province: string;

    @Column()
    country: string;

    @OneToOne(
        () => User,
        {
            cascade: true,
        }
    )
    @JoinColumn()
    user: User;

}
