import { Item } from "../item/item";
import { Client } from "../user/client";
import { Paiement } from "./paiement";
import { TypeCommande } from "./type-commande";

export class Commande {
    id?: number;
    type: TypeCommande;
    total: number;
    date: Date;
    items: Item[];
    client?: Client;
    paiement: Paiement;

    constructor(type: TypeCommande, total: number, date: Date, items: Item[], paiement: Paiement, id?: number, client?: Client) {
        this.id = id;
        this.type = type;
        this.total = total;
        this.date = date;
        this.items = items;
        this.client = client;
        this.paiement = paiement;
    }
}
