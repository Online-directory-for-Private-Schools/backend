import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PrivateSchool } from "./PrivateSchoolEntity";

@Entity()
export class Photo {
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
    