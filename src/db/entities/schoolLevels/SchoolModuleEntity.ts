import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SchoolYear } from "./SchoolYearEntity";
import { ModuleStream } from "./ModuleStreamEntity";

@Entity("school_modules")
export class SchoolModule extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    name_ar: string;

    @Column()
    name_fr: string;

    @ManyToOne(
        () => SchoolYear,
        (year) => year.modules,
        {
            onDelete: "CASCADE"
        }
    )
    year: SchoolYear;


    @ManyToOne(
        () => ModuleStream,
        (stream) => stream.modules,
        {
            onDelete: "SET NULL"
        }
    )
    stream: ModuleStream;


}