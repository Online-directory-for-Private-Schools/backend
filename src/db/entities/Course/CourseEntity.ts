import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    TableInheritance,
} from "typeorm";
import { PrivateSchool } from "../PrivateSchoolEntity";
import { Schedule } from "../ScheduleEntity";

@Entity("courses")
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Course extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    teacher_name: string;

    @Column()
    description: string;

    @Column({
        type: "numeric",
        nullable: true,
    })
    pricePerSession: number;

    @Column({
        type: "numeric",
        nullable: true,
    })
    monthlyPrice: number;

    @Column({
        default: true,
    })
    isActive: boolean;

    @ManyToOne(() => PrivateSchool, (privateSchool) => privateSchool.courses, {
        onDelete: "CASCADE",
    })
    school: PrivateSchool;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Schedule, (schedule) => schedule.course, {
        onDelete: "CASCADE",
    })
    schedules: Schedule[];
}
