import { Item } from "src/item/entities/item.entity";
import { Client } from "src/user/client/entities/client.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TypeCommande } from "./type-commande";
import { Paiement } from "./paiement.entity";
import { ItemCommande } from "./item-commande.entity";

@Entity()
export class Commande {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: TypeCommande })
    type: TypeCommande;

    @Column({ default: 0, type: 'float' })
    total: number;

    @Column()
    date: Date;

    @ManyToMany(() => ItemCommande, { cascade: true, eager: true })
    @JoinTable({
        name: 'commande_items',
        joinColumn: { name: 'commande_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'item_id', referencedColumnName: 'id' }
    })
    items: ItemCommande[];

    @ManyToOne(() => Client, { cascade: ['insert'], eager: true, nullable: true })
    @JoinTable()
    client: Client

    @OneToOne(() => Paiement, { cascade: true, eager: true })
    @JoinColumn()
    paiement: Paiement;

    constructor(type: TypeCommande, total: number, date: Date, items: ItemCommande[], client: Client, paiement: Paiement) {
        this.type = type;
        this.total = total;
        this.date = date;
        this.items = items;
        this.client = client;
        this.paiement = paiement;
    }
}
