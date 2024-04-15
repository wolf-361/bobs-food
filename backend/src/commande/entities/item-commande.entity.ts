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
    quantity: number;


    constructor(item: Item, quantity: number) {
        this.item = item;
        this.quantity = quantity;
    }
}