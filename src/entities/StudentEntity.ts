import { IsEmail, isPhoneNumber } from "class-validator";
import { ChildEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

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

    @CreateDateColumn()
    created_at: Date;

}
