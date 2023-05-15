import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "../UserEntity";
import { EmailVerificationEntity } from "./EmailVerificationEntity";

@Entity("auth")
export class Auth extends BaseEntity {

    @OneToOne(
        () => User,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn({
        name: "userId"
    })
    user: User;


    @PrimaryColumn({
        type: "uuid"
    })
    userId: string;


    @Column()
    hashed_password: string;


    @Column({
        default: false
    })
    verified: boolean;


    @OneToOne(
        () => EmailVerificationEntity,
        emailVerification => emailVerification.auth
    )
    emailVerification: EmailVerificationEntity


}