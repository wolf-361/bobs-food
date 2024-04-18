import { Item } from "src/item/entities/item.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ItemCommande {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Item, { eager: true })
    @JoinColumn({
        name: 'item_id',
        referencedColumnName: 'id'
    })
    item: Item;

    @Column()
    quantite: number;


    constructor(item: Item, quantite: number) {
        this.item = item;
        this.quantite = quantite;
    }
}