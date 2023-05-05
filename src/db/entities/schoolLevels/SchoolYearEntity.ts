import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SchoolLevel } from "./SchoolLevelEntity";
import { SchoolModule } from "./SchoolModuleEntity";

@Entity("school_years")
export class SchoolYear extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    year: number;

    @ManyToOne(
        () => SchoolLevel,
        (level) => level.years,
        {
            onDelete: "CASCADE"
        }
    )
    level: SchoolLevel


    @OneToMany(
        () => SchoolModule,
        (module) => module.year
    )
    modules: SchoolModule[]
}