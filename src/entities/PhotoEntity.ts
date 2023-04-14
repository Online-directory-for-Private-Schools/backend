import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PrivateSchool } from "./PrivateSchoolEntity";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn({
        type: "numeric"
    })
    id: string;


    @Column()
    url: string;


    @ManyToOne(
        ()=> PrivateSchool,
        school => school.photos
    )
    school: PrivateSchool;
}
    