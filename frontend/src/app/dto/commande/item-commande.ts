import { Item } from "../item/item";

export class ItemCommande {
    id?: number;
    item: Item;
    quantite: number;

    constructor(item: Item, quantite: number, id?: number) {
        this.id = id;
        this.item = item;
        this.quantite = quantite;
    }
}