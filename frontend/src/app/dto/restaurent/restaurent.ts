import { Item } from "../item/item";

export class Restaurent {
    id: string;
    adresse: string;
    menu: Item[];

    constructor(id: string, adresse: string, menu: Item[]) {
        this.id = id;
        this.adresse = adresse;
        this.menu = menu;
    }
}
