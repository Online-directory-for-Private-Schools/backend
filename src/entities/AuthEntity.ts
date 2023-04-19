import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UserEntity";
import { PrivateSchool } from "./PrivateSchoolEntity";

@Entity("auth")
export class Auth extends BaseEntity {

    @OneToOne(
        () => User,
        {
            cascade: true

        }
    )
    @JoinColumn({
        name: "userId"
    })
    user: User;


    @PrimaryColumn()
    userId: number;


    @Column()
    hashed_password: string;

}