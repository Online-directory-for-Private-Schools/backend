import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SchoolModule } from "./SchoolModuleEntity";

@Entity("highschool_streams")
export class ModuleStream extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    name_ar: string;

    @Column()
    name_fr: string;

    @OneToMany(
        () => SchoolModule,
        (module) => module.stream
    )
    modules: SchoolModule[]

}