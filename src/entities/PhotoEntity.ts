import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn({
        type: "numeric"
    })
    id: string;


    @Column()
    url: string;
    
}