import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PrivateSchool } from "./PrivateSchoolEntity";

@Entity("photos")
export class Photo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    url: string;


    @ManyToOne(
        ()=> PrivateSchool,
        school => school.photos,
        {
            onDelete: "CASCADE"
        }
    )
    school: PrivateSchool;
}
    