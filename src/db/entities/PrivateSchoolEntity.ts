import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./CourseEntity";
import { Photo } from "./PhotoEntity";
import { Review } from "./ReviewEntity";
import { User } from "./UserEntity";
import { Street } from "./Address/StreetEntity";


@Entity("private_schools")
export class PrivateSchool extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    bio: string;


    @Column({
        type: "float",
        default: 0
    })
    rating: number

    @Column({
        default: false
    })
    isHiring: boolean


    @Column({
        type: "numeric"
    })
    lng: string;

    @Column({
        type: "numeric"
    })
    lat: string;

    @OneToOne(
        () => Street,
        {
            onDelete: "CASCADE",
            eager: true
        }
    )
    @JoinColumn()
    street: Street
    

    @OneToOne(
        () => User,
        {
            eager: true
        }
    )
    @JoinColumn()
    owner: User;


    @OneToOne(() => Photo, {onDelete: "CASCADE"})
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


    @OneToMany(
        () => Review,
        review => review.school
    )
    reviews: Review[];

}