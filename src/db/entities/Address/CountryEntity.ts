import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Province } from "./ProvinceEntity";

@Entity("countries")
export class Country extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    name: string;


    // one to many with states
    @OneToMany(
        () => Province,
        state => state.country
    )
    provinces: Province[];

    


}
