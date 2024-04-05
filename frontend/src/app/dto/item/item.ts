import { ItemCategory } from "./item-categorie";

export class Item {
    id: number;
    nom: string;
    description: string;
    prix: number;
    image: string;
    categorie: ItemCategory;

    constructor(id: number, nom: string, description: string, prix: number, image: string, categorie: ItemCategory) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.prix = prix;
        this.image = image;
        this.categorie = categorie;
    }
}
