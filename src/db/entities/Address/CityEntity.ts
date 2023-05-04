import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./CountryEntity";
import { Province } from "./ProvinceEntity";

@Entity("cities")
export class City extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => Province,
        (state) => state.cities,
        {
            onDelete: "CASCADE",
        }
    )
    province: Province;


    @Column()
    name: string;

}
