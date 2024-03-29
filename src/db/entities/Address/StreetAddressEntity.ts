import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./CountryEntity";
import { Province } from "./ProvinceEntity";
import { City } from "./CityEntity";

@Entity("streets")
export class StreetAddress extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => City,
        {
            onDelete: "CASCADE",
            eager: true
        }
    )
    city: City;


    @Column()
    name: string;

}
