import { Commande } from "src/commande/entities/commande.entity";
import { Restaurent } from "src/restaurent/entities/restaurent.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    description: string;

    @Column()
    prix: number;

    @Column()
    image: string;

    @Column()
    categorie: string;

    @ManyToMany(() => Commande, commande => commande.items)
    @JoinTable()
    commandes: Commande[];

    @ManyToMany(() => Restaurent, restaurent => restaurent.menu)
    @JoinTable()
    restaurents: Restaurent[];
}
