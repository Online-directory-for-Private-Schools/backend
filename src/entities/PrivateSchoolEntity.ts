import { IsEmail, IsPhoneNumber } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Photo } from "./PhotoEntity";


@Entity()
export class PrivateSchool {
    @PrimaryGeneratedColumn({
        type: "numeric"
    })
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
    bio: string;


    @Column({
        type: "numeric"
    })
    phone_number: string;


    @Column({
        type: "float",
        default: 0
    })
    rating: number

    @Column({
        default: false
    })
    isHiring: boolean

    @CreateDateColumn()
    created_at: Date;


    @Column()
    lng: number;

    @Column()
    lat: number;


    @OneToOne(() => Photo)
    @JoinColumn()
    photo: Photo;


}