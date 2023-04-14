import { IsEmail, isPhoneNumber } from "class-validator";
import { ChildEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Student {
    @PrimaryGeneratedColumn({
        type: "numeric"
    })
    id: string;

    @Column()
    name: string

    @Column({
        unique: true
    })
    @IsEmail()
    email: string

    @Column({
        type: "numeric"
    })
    phone_number: string;

    @Column()
    city: string;

    @Column()
    province: string;

    @Column()
    country: string;

}
