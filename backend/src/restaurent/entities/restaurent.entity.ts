import { Item } from "src/item/entities/item.entity";
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Restaurent {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    adresse: string;

    @ManyToOne(() => Item)
    @JoinTable()
    menu: Item[];
}
