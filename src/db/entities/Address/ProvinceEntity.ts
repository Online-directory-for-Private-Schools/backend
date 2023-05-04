import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./CountryEntity";
import { City } from "./CityEntity";

@Entity("provinces")
export class Province extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    
    @ManyToOne(
        () => Country,
        (country) => country.provinces,
        {
            onDelete: "CASCADE",
            nullable: false
        }
    )
    country: Country;


    @OneToMany(
        () => City,
        (city) => city.province
    )
    cities: City[];


    @Column({
        unique: true
    })
    name: string;

}
