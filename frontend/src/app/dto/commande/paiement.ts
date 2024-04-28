import { TypePaiement } from "./type-paiement";

export class Paiement {
    id?: number;
    type: TypePaiement;
    montant: number;
    payerEnPersonne: boolean;

    constructor() {
        this.type = TypePaiement.CARTE;
        this.montant = 0;
        this.payerEnPersonne = false;
    }
}
