import { Item } from "src/item/entities/item.entity";
import { Client } from "src/user/client/entities/client.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TypeCommande } from "./type-commande";
import { Paiement } from "./paiement.entity";

@Entity()
export class Commande {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: TypeCommande })
    type: TypeCommande;

    @Column()
    total: number;

    @Column()
    date: Date;

    @ManyToMany(() => Item)
    @JoinTable()
    items: Item[];

    @ManyToOne(() => Client)
    @JoinTable()
    client: Client

    @OneToOne(() => Paiement)
    @JoinColumn()
    paiement: Paiement;
}
