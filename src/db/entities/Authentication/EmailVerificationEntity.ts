import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Auth } from "./AuthEntity";

@Entity()
export class EmailVerificationEntity extends BaseEntity {


    @OneToOne(
        () => Auth,
        auth => auth.emailVerification
    )
    @JoinColumn({
        name: "authId"
    })
    auth: Auth;


    @PrimaryColumn({
        type: "uuid"
    })
    authId: string;

    @Column()
    code: string;

    
    @Column({
        type: "numeric",
        default: "15" 
    })
    expiresAfterMinutes: number


    @UpdateDateColumn({
        type: "timestamp"
    })
    generated_at: Date;



}