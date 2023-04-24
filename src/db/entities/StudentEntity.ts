import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UserEntity";



/**
 * 
 * @deprecated  Student entity will be removed due to merging the student entity with the user entity
 */
@Entity("students")
export class Student extends BaseEntity { 

    @PrimaryGeneratedColumn()
    id: number;

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
