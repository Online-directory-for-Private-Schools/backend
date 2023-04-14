import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PrivateSchool } from "./PrivateSchoolEntity";

@Entity()
export class Course {
    @PrimaryGeneratedColumn({
        type: "numeric"
    })
    id: string;
    

    @Column()
    title: string;

    
    @Column()
    teacher_name: string


    @Column()
    description: string;


    @Column()
    module: string;

    @Column()
    level: string;  // How do we deal with levels?

    @Column({
        type: "numeric",
        nullable: true
    })
    price: number;


    @Column({
        default: true
    })
    isActive: boolean


    @ManyToOne(
        () => PrivateSchool,
        (privateSchool) => privateSchool.courses
    )
    school: PrivateSchool;


    @CreateDateColumn()
    created_at: Date;



}