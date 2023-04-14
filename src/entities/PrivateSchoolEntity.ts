import { IsEmail, IsPhoneNumber } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Photo } from "./PhotoEntity";
import { Course } from "./CourseEntity";


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
    profile_pic: Photo;

    @OneToMany(
        ()=> Photo,
        photo => photo.school
    )
    photos: Photo[];


    @OneToMany(
        () => Course,
        course => course.school
    )
    courses: Course[];

}