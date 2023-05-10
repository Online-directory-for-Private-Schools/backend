import { IsEmail } from "class-validator";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { City } from "./Address/CityEntity";


export enum UserType {
    STUDENT="student",
    SCHOOL_OWNER="school_owner",
}


@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;


    @Column({
        unique: true
    })
    @IsEmail()
    email: string;

    @Column({
        nullable: true
    })
    phone_number: string;

    @Column({
        type: "enum",
        enum: UserType
    })
    type: string;


    @ManyToOne(
        () => City,
        {
            onDelete: "CASCADE",
            eager: true
        }
    )
    @JoinColumn()
    city: City


    @CreateDateColumn()
    created_at: Date;


}