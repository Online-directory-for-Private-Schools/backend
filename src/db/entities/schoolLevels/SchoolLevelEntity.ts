import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SchoolYear } from "./SchoolYearEntity";

export enum SchoolLevelsEnum {
    PRIMARY_SCHOOL = 1,
    MIDDLE_SCHOOL = 2,
    HIGH_SCHOOL = 3,
}

@Entity("school_levels")
export class SchoolLevel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: SchoolLevelsEnum,
    })
    level: number;


    @OneToMany(
        () => SchoolYear,
        (year) => year.level
    )
    years: SchoolYear[]

}
