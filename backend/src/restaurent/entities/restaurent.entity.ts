import { Item } from "src/item/entities/item.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Restaurent {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    adresse: string;

    @ManyToMany(() => Item, { cascade: true})
    @JoinTable({
        name: "restaurent_menu",
        joinColumn: { name: "restaurent_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "item_id", referencedColumnName: "id" }

    })
    menu: Item[];

    constructor(adresse: string, menu: Item[]) {
        this.adresse = adresse;
        this.menu = menu;
    }
}
