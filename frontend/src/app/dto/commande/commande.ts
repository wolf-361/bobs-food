import { Client } from "../user/client";
import { ItemCommande } from "./item-commande";
import { Paiement } from "./paiement";
import { TypeCommande } from "./type-commande";
import { TypePaiement } from "./type-paiement";

export class Commande {
    id?: number;
    total: number;
    typeCommande: TypeCommande;
    adresseLivraison?: string;
    courriel?: string;
    date: Date;
    items: ItemCommande[];
    client?: Client;
    paiement: Paiement;

    constructor(typeCommande: TypeCommande, total: number,date: Date, items: ItemCommande[], paiement: Paiement, id?: number, client?: Client) {
        this.id = id;
        this.total = total;
        this.typeCommande= typeCommande;
        this.date = date;
        this.items = items;
        this.client = client;
        this.paiement = paiement;
    }
}
