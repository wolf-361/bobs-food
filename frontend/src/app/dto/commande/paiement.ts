import { TypePaiement } from "./type-paiement";

export class Paiement {
    id: number;
    type: TypePaiement;
    montant: number;

    constructor(id: number, type: TypePaiement, montant: number) {
        this.id = id;
        this.type = type;
        this.montant = montant;
    }
}
