import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column()
    adresse: string;

    @Column()
    salt: string;

    @Column()
    hashedPassword: string;
}
