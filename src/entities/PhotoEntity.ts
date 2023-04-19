import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PrivateSchool } from "./PrivateSchoolEntity";

@Entity("photos")
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    url: string;


    @ManyToOne(
        ()=> PrivateSchool,
        school => school.photos,
        {
            cascade: true
        }
    )
    school: PrivateSchool;
}
    