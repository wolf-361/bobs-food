import { Commande } from "src/commande/entities/commande.entity";
import { Restaurent } from "src/restaurent/entities/restaurent.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItemCategory } from "./item-categorie";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    description: string;

    @Column({ type: 'float' })
    prix: number;

    @Column()
    image: string;

    @Column({ enum: ItemCategory, default: ItemCategory.AUTRE })
    categorie: ItemCategory;
}
