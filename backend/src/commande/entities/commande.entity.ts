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

    @ManyToMany(() => ItemCommande, { cascade: true })
    @JoinTable({
        name: 'commande_items',
        joinColumn: { name: 'commande_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'item_id', referencedColumnName: 'id' }
    })
    items: ItemCommande[];

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
        this.items = items?.map(item => new ItemCommande(item.item, item.quantity));
        this.client = client;
        this.paiement = paiement;
    }
}
