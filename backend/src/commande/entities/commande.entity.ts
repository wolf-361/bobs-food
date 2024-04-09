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

    @ManyToMany(() => Item, { cascade: true })
    @JoinTable()
    items: { item: Item, quantity: number }[];

    @ManyToOne(() => Client)
    @JoinTable()
    client: Client

    @OneToOne(() => Paiement)
    @JoinColumn()
    paiement: Paiement;

    constructor(type: TypeCommande, total: number, date: Date, items: { item: Item, quantity: number }[], client: Client, paiement: Paiement) {
        this.type = type;
        this.total = total;
        this.date = date;
        this.items = items;
        this.client = client;
        this.paiement = paiement;
    }
}
