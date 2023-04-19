import { IsEmail } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum UserType {
    STUDENT,
    SCHOOL_OWNER
}


@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    @Column({
        unique: true
    })
    @IsEmail()
    email: string;

    @Column({
        type: "numeric",
        nullable: true
    })
    phone_number: string;

    @Column({
        type: "enum",
        enum: UserType
    })
    type: number;


    @CreateDateColumn()
    created_at: Date;

}