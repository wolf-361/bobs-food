import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TypePaiement } from "./type-paiement";

@Entity()
export class Paiement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: TypePaiement })
    type: TypePaiement;

    @Column()
    montant: number;

    constructor(type: TypePaiement, montant: number) {
        this.type = type;
        this.montant = montant;
    }
}