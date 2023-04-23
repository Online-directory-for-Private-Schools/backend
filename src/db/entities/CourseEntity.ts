import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PrivateSchool } from "./PrivateSchoolEntity";
import { Schedule } from "./ScheduleEntity";

@Entity("courses")
export class Course extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    

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
        (privateSchool) => privateSchool.courses,
        {
            onDelete: "CASCADE"
        }
    )
    school: PrivateSchool;


    @CreateDateColumn()
    created_at: Date;


    @OneToMany(
        () => Schedule,
        (schedule) => schedule.course,
        {
            onDelete: 'CASCADE'
        }
    )
    schedules: Schedule[];


}